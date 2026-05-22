"use client"

export type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "granted"; city: string; state: string; zip: string; lat: number; lng: number }
  | { status: "denied" }

async function reverseGeocode(
  lat: number,
  lng: number,
  token: string,
): Promise<{ city: string; state: string; zip: string } | null> {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place,region,postcode&access_token=${token}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = (await res.json()) as {
      features?: { place_type: string[]; text: string; context?: { id: string; text: string }[] }[]
    }
    const features = data.features ?? []
    const place = features.find((f) => f.place_type.includes("place"))
    const region = features.find((f) => f.place_type.includes("region"))
    const postcode = features.find((f) => f.place_type.includes("postcode"))
    const city = place?.text ?? ""
    const state = region?.text ?? ""
    const zip = postcode?.text ?? ""
    if (!city && !state) return null
    return { city, state, zip }
  } catch {
    return null
  }
}

/**
 * Requests browser geolocation and reverse-geocodes the result via Mapbox.
 * Calls `onResult` with the final state (granted or denied).
 */
export function requestLocation(
  onResult: (state: LocationState) => void,
): void {
  if (!navigator.geolocation) {
    onResult({ status: "denied" })
    return
  }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ""
      const geo = token ? await reverseGeocode(lat, lng, token) : null
      onResult({
        status: "granted",
        city: geo?.city ?? "",
        state: geo?.state ?? "",
        zip: geo?.zip ?? "",
        lat,
        lng,
      })
    },
    () => {
      onResult({ status: "denied" })
    },
  )
}

/** Same as {@link requestLocation}, but awaited (e.g. on form submit instead of mount). */
export function requestLocationOnce(): Promise<LocationState> {
  return new Promise((resolve) => {
    requestLocation(resolve)
  })
}
