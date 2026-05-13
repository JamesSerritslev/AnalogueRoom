import type { PortableTextBlock } from "@portabletext/types"

/** Minimal Sanity `image` field for `urlFor` / `sanityImageUrl` */
export interface SanityImageField {
  _type?: string
  asset?: {
    _ref: string
    _type?: string
  }
  hotspot?: Record<string, unknown>
}

export interface SiteImagery {
  _id: string
  homeHero?: SanityImageField
  innerPageHero?: SanityImageField
  logo?: SanityImageField
  roomTheSpace?: SanityImageField
}

export interface VenueStatPair {
  value?: string
  label?: string
}

export interface HostEventVenueStats {
  _id: string
  standing?: VenueStatPair
  seated?: VenueStatPair
  squareFootage?: VenueStatPair
  minBooking?: VenueStatPair
}

export interface Event {
  _id: string
  title: string
  slug?: {
    current: string
  }
  eventType: string
  date: string
  time: string
  description: string
  longDescription?: PortableTextBlock[]
  image?: SanityImageField
  ticketUrl?: string
  featured?: boolean
}
