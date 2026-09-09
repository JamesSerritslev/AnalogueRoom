import {
  formatEventDate,
  visibleEventType,
} from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import type { Event } from "@/lib/sanity/types"

function articleFor(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a"
}

/**
 * Shared lead for every event page. Fills in title, type, date, and time
 * from the CMS document — no per-event essay required.
 */
export function eventPageLead(event: Event): string {
  const title = event.title?.trim() || "This night"
  const typeLabel = (visibleEventType(event.eventType) || "night").toLowerCase()
  const dateLine = formatEventDate(event.date)
  const timeBit = event.time?.trim() ? ` at ${event.time.trim()}` : ""
  const weekly =
    event.recurring && event.happensOn
      ? ` ${formatEveryWeekday(event.happensOn)} the same night returns.`
      : ""

  return `${title} is ${articleFor(typeLabel)} ${typeLabel} at Analogue Room, a vinyl lounge and wine bar in downtown Solvang, on ${dateLine}${timeBit}.${weekly} Walk in for wine, records, and our Side Hustle Pizza.`
}
