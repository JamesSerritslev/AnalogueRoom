/**
 * Canonical venue pin for Mapbox and deep links (must stay in sync with the map marker).
 * Mapbox expects `[longitude, latitude]`.
 */
export const VENUE_LNG_LAT: [number, number] = [
  -120.138116 + 0.000005,
  34.59649 - 0.0002,
]

/** Opens the venue in Apple Maps (`https://` works across Apple devices). */
export const VENUE_APPLE_MAPS_URL = `https://maps.apple.com/?ll=${VENUE_LNG_LAT[1]},${VENUE_LNG_LAT[0]}&q=${encodeURIComponent("The Analogue Room")}`
