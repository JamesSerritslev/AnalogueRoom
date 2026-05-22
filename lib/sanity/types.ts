import type { PortableTextBlock } from "@portabletext/types"

/** Minimal Sanity `image` field shape used by `sanityImageUrl` */
export interface SanityImageField {
  _type?: string
  asset?: {
    _ref: string
    _type?: string
  }
  hotspot?: Record<string, unknown>
}

export interface VenueStatPair {
  value?: string
}

export interface SiteBrandDoc {
  logo?: SanityImageField
  innerHero?: SanityImageField
  tagline?: string
  address?: string
  instagramHandle?: string
  instagramUrl?: string
  sisterPropertyName?: string
  sisterPropertyUrl?: string
}

export interface PillarItem {
  title?: string
  description?: string
}

export interface HoursRow {
  day?: string
  time?: string
  closed?: boolean
}

export interface PageHomeDoc {
  heroBackground?: SanityImageField
  heroHeadlineLine1?: string
  heroHeadlineLine2?: string
  heroLead?: string
  heroMetaHours?: string
  heroMetaLocation?: string
  pillarsEyebrow?: string
  pillarsHeadline?: string
  pillarsBody?: string
  pillars?: PillarItem[]
  roomSectionImage?: SanityImageField
  roomEyebrow?: string
  roomHeadline?: string
  roomBody?: string[]
  offeringsBackground?: SanityImageField
  offeringsEyebrow?: string
  offeringsHeadline?: string
  offeringsBody?: string
  offeringsWinesTitle?: string
  offeringsWinesDescription?: string
  offeringsBeerTitle?: string
  offeringsBeerDescription?: string
  offeringsZeroProofTitle?: string
  offeringsZeroProofDescription?: string
  visitHeadline?: string
  visitBody?: string
  hours?: HoursRow[]
}

export interface AboutTeamMember {
  name?: string
  role?: string
  photo?: SanityImageField
  bio?: string
}

export interface PageAboutDoc {
  storyParagraphs?: string[]
  teamIntro?: string
  teamMembers?: AboutTeamMember[]
}

export interface PageEventsIndexDoc {
  introBody?: string
}

export interface PageHostEventDoc {
  introBlurb?: string
  standing?: VenueStatPair
  seated?: VenueStatPair
  squareFootage?: VenueStatPair
  minBooking?: VenueStatPair
}

export interface PageMenusMenuItem {
  title?: string
  description?: string
  price?: string
  /** Legacy fields (pre–title/description); resolver still reads these. */
  name?: string
  note?: string
}

export interface PageMenusCategory {
  title?: string
  items?: PageMenusMenuItem[]
}

export interface PageMenusDoc {
  wines?: PageMenusCategory[]
  beer?: PageMenusCategory[]
  zeroProof?: PageMenusCategory[]
}

export interface LayoutSingletons {
  brand: SiteBrandDoc | null
  home: PageHomeDoc | null
  about: PageAboutDoc | null
  eventsIndex: PageEventsIndexDoc | null
  host: PageHostEventDoc | null
  menus: PageMenusDoc | null
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
