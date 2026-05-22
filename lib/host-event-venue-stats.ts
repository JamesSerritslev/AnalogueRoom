import type { PageHostEventDoc } from "@/lib/sanity/types"

export type VenueStatDisplay = { value: string; label: string }

export const DEFAULT_HOST_EVENT_VENUE_STATS: VenueStatDisplay[] = [
  { value: "60", label: "Standing Capacity" },
  { value: "40", label: "Seated Capacity" },
  { value: "500", label: "Square Footage" },
  { value: "4hr+", label: "Min Booking" },
]

/** Treat as “no value” so code defaults (or Sanity later) can win. */
function isPlaceholderStatValue(value: string | undefined): boolean {
  const v = value?.trim() ?? ""
  if (!v) return true
  const lower = v.toLowerCase()
  return lower === "tbd" || lower === "n/a" || lower === "na" || v === ""
}

/** Merge Sanity `pageHostEvent` stat tiles with defaults when fields are empty. */
export function resolveHostEventVenueStats(
  doc:
    | Pick<
        PageHostEventDoc,
        "standing" | "seated" | "squareFootage" | "minBooking"
      >
    | null
    | undefined,
): VenueStatDisplay[] {
  const defs = DEFAULT_HOST_EVENT_VENUE_STATS
  const pick = (
    pair: { value?: string } | undefined,
    i: number,
  ): VenueStatDisplay => {
    const rawValue = pair?.value?.trim()
    const v = isPlaceholderStatValue(rawValue) ? "" : (rawValue ?? "")
    return {
      value: v || defs[i]!.value,
      label: defs[i]!.label,
    }
  }

  if (!doc) {
    return [...defs]
  }

  return [
    pick(doc.standing, 0),
    pick(doc.seated, 1),
    pick(doc.squareFootage, 2),
    pick(doc.minBooking, 3),
  ]
}
