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

/** Canonical display phone (match Google Business Profile character-for-character). */
export const VENUE_PHONE_DISPLAY = "(805) 691-9093"

/**
 * Display phone from GBP — override with `NEXT_PUBLIC_VENUE_PHONE` if set;
 * otherwise uses {@link VENUE_PHONE_DISPLAY}.
 */
export function getVenuePhoneDisplay(): string {
  return process.env.NEXT_PUBLIC_VENUE_PHONE?.trim() || VENUE_PHONE_DISPLAY
}

/** Digits-only for `tel:` links. */
export function getVenuePhoneTelHref(): string | null {
  const digits = getVenuePhoneDisplay().replace(/\D/g, "")
  if (!digits) return null
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`
}

/**
 * Canonical Google Maps place page for The Analogue Room (no tracking query params).
 * Prefer this over env URLs — Vercel often truncates values that contain `&`.
 * CID from Google: 0xb2c8a55da7db22a7
 */
export const VENUE_GOOGLE_PLACE_URL =
  "https://www.google.com/maps/place/Analogue+Room/@34.5964433,-120.1380902,17z/data=!3m1!4b1!4m6!3m5!1s0x80e9554f15f47a23:0xb2c8a55da7db22a7!8m2!3d34.5964433!4d-120.1380902!16s%2Fg%2F11nq_05mjq"

/**
 * Raw env for Google listing. May be a real Place ID (`ChIJ…`) or a share URL.
 * Do not pass URLs into `placeid=` — that 404s. Long Maps URLs with `&` are unreliable in Vercel env.
 */
function getGoogleListingEnv(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim() ||
    ""
  )
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value)
}

/** True Place ID only (e.g. ChIJ…). Empty if env is a share URL or missing. */
export function getGooglePlaceId(): string {
  const raw = getGoogleListingEnv()
  if (!raw || isHttpUrl(raw)) return ""
  if (/^ChIJ[\w-]+$/.test(raw) || /^[A-Za-z0-9_-]{20,}$/.test(raw)) return raw
  return ""
}

/**
 * Google listing URL for CTAs.
 * Always falls back to the hardcoded place URL so production never depends on a mangled env string.
 */
export function getGoogleBusinessListingUrl(): string {
  const raw = getGoogleListingEnv()
  // Only trust short share links from env (no `&` truncation risk). Full maps URLs → use constant.
  if (raw && isHttpUrl(raw) && !raw.includes("&") && raw.length < 200) {
    return raw
  }
  return VENUE_GOOGLE_PLACE_URL
}

/**
 * Open Thu–Sat 4pm–10pm, Sun–Mon 4pm–8pm; closed Tue–Wed.
 * Day of week for schema.org: Monday=1 … Sunday=7
 */
export const VENUE_OPENING_HOURS = [
  { dayOfWeek: "Monday" as const, opens: "16:00", closes: "20:00" },
  { dayOfWeek: "Thursday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Friday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Saturday" as const, opens: "16:00", closes: "22:00" },
  { dayOfWeek: "Sunday" as const, opens: "16:00", closes: "20:00" },
]

/** Opens the venue in Apple Maps (`https://` works across Apple devices). */
export const VENUE_APPLE_MAPS_URL = `https://maps.apple.com/?ll=${VENUE_LNG_LAT[1]},${VENUE_LNG_LAT[0]}&q=${encodeURIComponent(VENUE_NAME)}`

/** Google Maps place URL for CTAs (hardcoded listing; env optional for short share links). */
export function getVenueGoogleMapsUrl(): string {
  return getGoogleBusinessListingUrl()
}

/**
 * Reviews CTA → Google place page (reviews are on the listing).
 * Avoids `/local/reviews?placeid=` which 404s when env is a URL, not a Place ID.
 */
export function getVenueGoogleReviewsUrl(): string {
  return getGoogleBusinessListingUrl()
}

/**
 * Keyless Google Maps embed pinned to the venue.
 * Never uses Place ID / share URLs in `q=` — those break the classic embed.
 */
export function getVenueGoogleMapsEmbedSrc(): string {
  const [lng, lat] = VENUE_LNG_LAT
  // Address query is more reliable across environments than place_id on output=embed.
  const q = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS_SINGLE_LINE}`)
  return `https://maps.google.com/maps?q=${q}&ll=${lat},${lng}&z=17&output=embed`
}
