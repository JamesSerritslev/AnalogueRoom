import { parseCalendarDate } from "@/lib/utils"

export function formatEventDate(dateValue?: string): string {
  const date = dateValue ? parseCalendarDate(dateValue) : null
  if (!date) return "Date TBD"
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/** Shorter date for titles and archive rows (e.g. August 15, 2025). */
export function formatEventDateShort(dateValue?: string): string {
  const date = dateValue ? parseCalendarDate(dateValue) : null
  if (!date) return "Date TBD"
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/** Hide the CMS “Other” label on the public site. */
export function visibleEventType(eventType?: string | null): string | null {
  const trimmed = eventType?.trim()
  if (!trimmed) return null
  if (trimmed.toLowerCase() === "other") return null
  return trimmed
}

export function eventPath(slug: string): string {
  return `/events/${encodeURIComponent(slug)}`
}

/** Document / Open Graph title — long enough for crawlers, includes Solvang. */
export function eventDocumentTitle(
  event: { title?: string; eventType?: string | null; date?: string },
  listed: boolean,
): string {
  const name = event.title?.trim() || "Event"
  if (listed) {
    const type = visibleEventType(event.eventType)
    return type
      ? `${name} · ${type} at Analogue Room in Solvang`
      : `${name} · Event at Analogue Room in Solvang`
  }
  return `${name} · ${formatEventDateShort(event.date)} · Analogue Room in Solvang`
}
