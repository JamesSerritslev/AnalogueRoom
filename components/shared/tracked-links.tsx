"use client"

import type { ReactNode } from "react"
import {
  trackFacebookClick,
  trackGoogleReviewsClick,
  trackInstagramClick,
  trackOpenInMaps,
  trackTapToCall,
  trackYelpClick,
  type MapsProvider,
} from "@/lib/analytics"
import {
  VENUE_APPLE_MAPS_URL,
  getVenueGoogleMapsUrl,
} from "@/lib/venue-location"

type BaseLinkProps = {
  placement: string
  className?: string
  children: ReactNode
}

/** `tel:` link with GA4 `tap_to_call`. */
export function TrackedTelLink({
  href,
  placement,
  className,
  children,
}: BaseLinkProps & { href: string }) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackTapToCall(placement)}
    >
      {children}
    </a>
  )
}

/** Instagram outbound link with GA4 `instagram_click`. */
export function TrackedInstagramLink({
  href,
  placement,
  className,
  children,
}: BaseLinkProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackInstagramClick(placement)}
    >
      {children}
    </a>
  )
}

/** Facebook outbound link with GA4 `facebook_click`. */
export function TrackedFacebookLink({
  href,
  placement,
  className,
  children,
}: BaseLinkProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackFacebookClick(placement)}
    >
      {children}
    </a>
  )
}

/** Yelp outbound link with GA4 `yelp_click`. */
export function TrackedYelpLink({
  href,
  placement,
  className,
  children,
}: BaseLinkProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackYelpClick(placement)}
    >
      {children}
    </a>
  )
}

/** Google reviews outbound link with GA4 `google_reviews_click`. */
export function TrackedGoogleReviewsLink({
  href,
  placement,
  className,
  children,
}: BaseLinkProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackGoogleReviewsClick(placement)}
    >
      {children}
    </a>
  )
}

type DirectionsLinkProps = BaseLinkProps & {
  /** Defaults to Apple Maps (most existing CTAs). */
  provider?: MapsProvider
}

/** Apple or Google Maps directions link with GA4 `open_in_maps`. */
export function TrackedDirectionsLink({
  placement,
  provider = "apple",
  className,
  children,
}: DirectionsLinkProps) {
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
