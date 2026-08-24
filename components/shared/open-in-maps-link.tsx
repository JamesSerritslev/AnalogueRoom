"use client"

import type { ReactNode } from "react"
import { trackOpenInMaps, type MapsProvider } from "@/lib/analytics"
import {
  VENUE_APPLE_MAPS_URL,
  getVenueGoogleMapsUrl,
} from "@/lib/venue-location"

type OpenInMapsLinkProps = {
  /** Where the link appears — used as a GA4 event dimension */
  placement: string
  /** Apple (default) or Google Maps destination */
  provider?: MapsProvider
  className?: string
  children: ReactNode
}

export function OpenInMapsLink({
  placement,
  provider = "apple",
  className,
  children,
}: OpenInMapsLinkProps) {
  const href =
    provider === "google" ? getVenueGoogleMapsUrl() : VENUE_APPLE_MAPS_URL

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOpenInMaps(placement, provider)}
    >
      {children}
    </a>
  )
}
