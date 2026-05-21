import { cache } from "react"
import { getClientForRequest } from "./client"
import type { Event } from "./types"

/** Same-day events expire at 11:59 PM America/Los_Angeles. */
const LA_TEST_EXPIRY_TIME = "23:59"

function getLosAngelesNowParts(): { todayInLA: string; currentTimeInLA: string } {
  const now = new Date()
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const year = dateParts.find((p) => p.type === "year")?.value ?? "0000"
  const month = dateParts.find((p) => p.type === "month")?.value ?? "00"
  const day = dateParts.find((p) => p.type === "day")?.value ?? "00"
  const todayInLA = `${year}-${month}-${day}`

  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now)
  const hour = timeParts.find((p) => p.type === "hour")?.value ?? "00"
  const minute = timeParts.find((p) => p.type === "minute")?.value ?? "00"
  const currentTimeInLA = `${hour}:${minute}`
  return { todayInLA, currentTimeInLA }
}

export async function getEvents(): Promise<Event[]> {
  const client = await getClientForRequest()
  if (!client) {
    return []
  }

  try {
    const { todayInLA, currentTimeInLA } = getLosAngelesNowParts()
    const events = await client.fetch<Event[]>(
      `*[
        _type == "event" &&
        (
          date > $todayInLA ||
          (date == $todayInLA && $currentTimeInLA <= $sameDayCutoff)
        )
      ] | order(date asc) {
        _id,
        title,
        slug,
        eventType,
        date,
        time,
        description,
        longDescription,
        image,
        ticketUrl,
        featured
      }`,
      { todayInLA, currentTimeInLA, sameDayCutoff: LA_TEST_EXPIRY_TIME }
    )
    return events
  } catch (error) {
    console.error("Error fetching events from Sanity:", error)
    return []
  }
}

export const getEventBySlug = cache(async function getEventBySlug(slug: string): Promise<Event | null> {
  const client = await getClientForRequest()
  if (!client) {
    return null
  }

  try {
    const event = await client.fetch<Event>(
      `*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        eventType,
        date,
        time,
        description,
        longDescription,
        image,
        ticketUrl,
        featured
      }`,
      { slug }
    )
    return event
  } catch (error) {
    console.error("Error fetching event from Sanity:", error)
    return null
  }
})
