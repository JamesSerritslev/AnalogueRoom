"use client"

import { useCallback, useRef, useState } from "react"
import { type LocationState, requestLocationOnce } from "@/lib/geolocation"

/** One browser geolocation round-trip per engagement; reused by submit if still pending / idle. */
export function useDedupedLocationResolution() {
  const [location, setLocation] = useState<LocationState>({ status: "idle" })
  const resolvedRef = useRef<LocationState | null>(null)
  const inflightRef = useRef<Promise<LocationState> | null>(null)

  const resolveLocation = useCallback(async (): Promise<LocationState> => {
    const done = resolvedRef.current
    if (done?.status === "granted" || done?.status === "denied") {
      setLocation(done)
      return done
    }
    if (!inflightRef.current) {
      inflightRef.current = requestLocationOnce().then((r) => {
        resolvedRef.current = r
        inflightRef.current = null
        return r
      })
    }
    const r = await inflightRef.current
    setLocation(r)
    return r
  }, [])

  return { location, resolveLocation }
}
