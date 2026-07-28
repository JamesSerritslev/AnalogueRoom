"use client"

import type { ReactNode } from "react"
import { trackOpenInMaps } from "@/lib/analytics"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"

type OpenInMapsLinkProps = {
  /** Where the link appears — used as a GA4 event dimension */
  placement: string
  className?: string
  children: ReactNode
}

export function OpenInMapsLink({
  placement,
  className,
  children,
}: OpenInMapsLinkProps) {
  return (
    <a
      href={VENUE_APPLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOpenInMaps(placement)}
    >
      {children}
    </a>
  )
}
