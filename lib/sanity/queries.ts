import { cache } from "react"
import {
  getLosAngelesNowParts,
  isOneOffListed,
  isRecurringListed,
  LA_EVENT_CUTOFF_TIME,
  resolveRecurringOccurrenceDate,
} from "@/lib/event-recurrence"
import { getClientForRequest, getPublishedClient } from "./client"
import type { Event } from "./types"

const EVENT_RECURRENCE_PROJECTION = `
  recurring,
  happensOn
`

/** Shared event image projection — includes dimensions for native aspect rendering. */
const EVENT_IMAGE_PROJECTION = `image{
  ...,
  asset->{
    _id,
    url,
    metadata{
      dimensions{
        width,
        height,
        aspectRatio
      }
    }
  }
}`

export async function getEvents(): Promise<Event[]> {
  const rawClient = await getClientForRequest()
  if (!rawClient) {
    return []
  }
  const client = rawClient.withConfig({ useCdn: false })

  try {
    const { todayInLA, currentTimeInLA } = getLosAngelesNowParts()
    const events = await client.fetch<Event[]>(
      `*[
        _type == "event" &&
        (
          recurring == true ||
          date > $todayInLA ||
          (date == $todayInLA && $currentTimeInLA <= $sameDayCutoff)
        )
      ] {
        _id,
        title,
        slug,
        date,
        time,
        ${EVENT_RECURRENCE_PROJECTION},
        ${EVENT_IMAGE_PROJECTION}
      }`,
      { todayInLA, currentTimeInLA, sameDayCutoff: LA_EVENT_CUTOFF_TIME },
    )
    return events
      .map((event) => resolveListedEvent(event, todayInLA, currentTimeInLA))
      .filter((event): event is Event => event !== null)
      .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))
  } catch (error) {
    console.error("Error fetching events from Sanity:", error)
    return []
  }
}

/** Next one-time (non-weekly) event still on the calendar, if any. */
export const getNextOneOffEvent = cache(async function getNextOneOffEvent(): Promise<Event | null> {
  const client = await getClientForRequest()
  if (!client) return null

  try {
    const { todayInLA, currentTimeInLA } = getLosAngelesNowParts()
    const events = await client.fetch<Event[]>(
      `*[
        _type == "event" &&
        recurring != true &&
        defined(slug.current) &&
        defined(title) &&
        defined(date) &&
        (
          date > $todayInLA ||
          (date == $todayInLA && $currentTimeInLA <= $sameDayCutoff)
        )
      ] {
        _id,
        title,
        slug,
        date,
        time,
        ${EVENT_RECURRENCE_PROJECTION}
      } | order(date asc, time asc)`,
      { todayInLA, currentTimeInLA, sameDayCutoff: LA_EVENT_CUTOFF_TIME },
    )
    const listed = events.filter((event) => isOneOffListed(event.date, todayInLA, currentTimeInLA))
    listed.sort((a, b) => {
      const byDate = (a.date ?? "").localeCompare(b.date ?? "")
      if (byDate !== 0) return byDate
      return (a.time ?? "").localeCompare(b.time ?? "")
    })
    return listed[0] ?? null
  } catch (error) {
    console.error("Error fetching next one-off event from Sanity:", error)
    return null
  }
})

export const getEventBySlug = cache(async function getEventBySlug(slug: string): Promise<Event | null> {
  const client = await getClientForRequest()
  if (!client) {
    return null
  }
  return fetchEventBySlug(client, slug)
})

/** Published event only — safe in OG image generation (no draftMode). */
export async function getPublishedEventBySlug(slug: string): Promise<Event | null> {
  const client = getPublishedClient()
  if (!client) {
    return null
  }
  return fetchEventBySlug(client, slug)
}

async function fetchEventBySlug(
  client: NonNullable<ReturnType<typeof getPublishedClient>>,
  slug: string,
): Promise<Event | null> {
  try {
    const event = await client.fetch<Event>(
      `*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        eventType,
        date,
        time,
        ${EVENT_RECURRENCE_PROJECTION},
        description,
        longDescription,
        ${EVENT_IMAGE_PROJECTION},
        heroBackground,
        ticketUrl,
        featured
      }`,
      { slug }
    )
    return event ? withDisplayOccurrence(event) : null
  } catch (error) {
    console.error("Error fetching event from Sanity:", error)
    return null
  }
}

export type EventSlugEntry = {
  slug: string
  date?: string
  recurring?: boolean
  happensOn?: string
  updatedAt?: string
  imageUrl?: string
}

/** All event slugs, including expired — detail pages stay live forever. */
export async function getAllEventSlugs(): Promise<EventSlugEntry[]> {
  const client = getPublishedClient()
  if (!client) {
    return []
  }

  try {
    const rows = await client.fetch<
      {
        slug?: { current?: string }
        date?: string
        recurring?: boolean
        happensOn?: string
        _updatedAt?: string
        imageUrl?: string
      }[]
    >(
      `*[_type == "event" && defined(slug.current)]{
        slug,
        date,
        ${EVENT_RECURRENCE_PROJECTION},
        _updatedAt,
        "imageUrl": image.asset->url
      } | order(date desc)`,
    )
    return rows
      .map((row) => ({
        slug: row.slug?.current?.trim() ?? "",
        date: row.date,
        recurring: row.recurring,
        happensOn: row.happensOn,
        updatedAt: row._updatedAt,
        imageUrl: row.imageUrl,
      }))
      .filter((row) => row.slug.length > 0)
  } catch (error) {
    console.error("Error fetching event slugs from Sanity:", error)
    return []
  }
}

/** True while the event should still appear on the /events listing. */
export function isEventListed(event: EventSlugEntry | Event): boolean {
  const { todayInLA, currentTimeInLA } = getLosAngelesNowParts()
  if (event.recurring) {
    return isRecurringListed(event)
  }
  return isOneOffListed(event.date, todayInLA, currentTimeInLA)
}

function withDisplayOccurrence(event: Event): Event {
  const { todayInLA, currentTimeInLA } = getLosAngelesNowParts()
  const next = resolveRecurringOccurrenceDate(event, todayInLA, currentTimeInLA)
  if (!next) return event
  return { ...event, date: next }
}

function resolveListedEvent(
  event: Event,
  todayInLA: string,
  currentTimeInLA: string,
): Event | null {
  if (event.recurring) {
    if (!isRecurringListed(event)) return null
    const next = resolveRecurringOccurrenceDate(event, todayInLA, currentTimeInLA)
    return next ? { ...event, date: next } : event
  }
  if (!isOneOffListed(event.date, todayInLA, currentTimeInLA)) return null
  return event
}
