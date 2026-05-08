import { client } from "./client"
import type { Event } from "./types"

export async function getEvents(): Promise<Event[]> {
  if (!client) {
    return []
  }

  try {
    const events = await client.fetch<Event[]>(
      `*[_type == "event" && date >= now()] | order(date asc) {
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
      }`
    )
    return events
  } catch (error) {
    console.error("Error fetching events from Sanity:", error)
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
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
}

export async function getFeaturedEvents(): Promise<Event[]> {
  if (!client) {
    return []
  }

  try {
    const events = await client.fetch<Event[]>(
      `*[_type == "event" && featured == true && date >= now()] | order(date asc)[0...3] {
        _id,
        title,
        slug,
        eventType,
        date,
        time,
        description,
        image,
        ticketUrl,
        featured
      }`
    )
    return events
  } catch (error) {
    console.error("Error fetching featured events from Sanity:", error)
    return []
  }
}
