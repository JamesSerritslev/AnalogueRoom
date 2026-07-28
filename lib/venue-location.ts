/**
 * Canonical venue pin for Mapbox and deep links (must stay in sync with the map marker).
 * Mapbox expects `[longitude, latitude]`.
 */
export const VENUE_LNG_LAT: [number, number] = [
  -120.138116 + 0.000005,
  34.59649 - 0.0002,
]

export const VENUE_NAME = "The Analogue Room"

export const VENUE_STREET_ADDRESS = "1693 Mission Drive, Suite D2"
export const VENUE_ADDRESS_LOCALITY = "Solvang"
export const VENUE_ADDRESS_REGION = "CA"
export const VENUE_POSTAL_CODE = "93463"
export const VENUE_ADDRESS_COUNTRY = "US"

/** Human-readable multiline address (matches GBP / site NAP). */
export const VENUE_ADDRESS_MULTILINE =
  "1693 Mission Drive\nSuite D2\nSolvang, CA 93463"

/** Single-line NAP string for hero meta, schema text, and maps queries. */
export const VENUE_ADDRESS_SINGLE_LINE =
  "1693 Mission Drive, Suite D2, Solvang, CA 93463"

/**
 * Display phone from GBP — set `NEXT_PUBLIC_VENUE_PHONE` to match Google Business Profile
 * character-for-character (e.g. `(805) 555-0100`). Empty when unset.
 */
export function getVenuePhoneDisplay(): string {
  return (process.env.NEXT_PUBLIC_VENUE_PHONE ?? "").trim()
}

/** Digits-only for `tel:` links. */
export function getVenuePhoneTelHref(): string | null {
  const digits = getVenuePhoneDisplay().replace(/\D/g, "")
  if (!digits) return null
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}

/** Google Place ID when known (reviews embed / maps). */
export function getGooglePlaceId(): string {
  return (process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "").trim()
}

/**
 * Open Thu–Mon 4pm–10pm; closed Tue–Wed.
 * Day of week for schema.org: Monday=1 … Sunday=7
 */
export const VENUE_OPENING_HOURS = [
  { dayOfWeek: "Monday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Thursday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Friday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Saturday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Sunday" as const, opens: "16:00", closes: "22:00" },
]

/** Opens the venue in Apple Maps (`https://` works across Apple devices). */
export const VENUE_APPLE_MAPS_URL = `https://maps.apple.com/?ll=${VENUE_LNG_LAT[1]},${VENUE_LNG_LAT[0]}&q=${encodeURIComponent(VENUE_NAME)}`

/** Google Maps search / place URL for CTAs and review fallbacks. */
export function getVenueGoogleMapsUrl(): string {
  const placeId = getGooglePlaceId()
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`
  }
  const q = `${VENUE_NAME}, ${VENUE_ADDRESS_SINGLE_LINE}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}

/** GBP-style reviews deep link (falls back to maps search). */
export function getVenueGoogleReviewsUrl(): string {
  const placeId = getGooglePlaceId()
  if (placeId) {
    return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`
  }
  return getVenueGoogleMapsUrl()
}

/**
 * Official Google Maps embed iframe src for homepage GBP consistency.
 * Uses the classic keyless embed (name + full NAP address).
 */
export function getVenueGoogleMapsEmbedSrc(): string {
  const placeId = getGooglePlaceId()
  const q = placeId
    ? encodeURIComponent(`place_id:${placeId}`)
    : encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS_SINGLE_LINE}`)
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`
}
