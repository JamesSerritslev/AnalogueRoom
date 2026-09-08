"use client"

export type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "granted"; city: string; state: string; zip: string; lat: number; lng: number }
  | { status: "denied" }

/**
 * Requests browser geolocation. Coordinates stay on this request unless the
 * visitor also submits the newsletter or host-event form.
 */
function requestLocation(
  onResult: (state: LocationState) => void,
): void {
  if (!navigator.geolocation) {
    onResult({ status: "denied" })
    return
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords
      onResult({
        status: "granted",
        city: "",
        state: "",
        zip: "",
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
