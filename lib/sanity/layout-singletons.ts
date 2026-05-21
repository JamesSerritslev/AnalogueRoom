import { cache } from "react"
import { getClientForRequest } from "@/lib/sanity/client"
import type { LayoutSingletons } from "@/lib/sanity/types"

const LAYOUT_QUERY = `{
  "brand": *[_id == "siteBrand"][0]{
    logo,
    innerHero,
    tagline,
    copyrightLine,
    address,
    instagramHandle,
    instagramUrl,
    sisterPropertyName,
    sisterPropertyUrl
  },
  "home": *[_id == "pageHome"][0]{
    heroBackground,
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroLead,
    heroMetaHours,
    heroMetaLocation,
    pillarsEyebrow,
    pillarsHeadline,
    pillarsBody,
    pillars[]{ title, description },
    roomSectionImage,
    roomEyebrow,
    roomHeadline,
    roomBody,
    offeringsBackground,
    offeringsEyebrow,
    offeringsHeadline,
    offeringsBody,
    offeringsWinesTitle,
    offeringsWinesDescription,
    offeringsBeerTitle,
    offeringsBeerDescription,
    offeringsZeroProofTitle,
    offeringsZeroProofDescription,
    visitHeadline,
    visitBody,
    hours[]{ day, time, closed }
  },
  "about": *[_id == "pageAbout"][0]{ storyParagraphs, teamIntro, teamMembers[]{ name, role, photo, bio } },
  "eventsIndex": *[_id == "pageEventsIndex"][0]{ introBody },
  "host": *[_id == "pageHostEvent"][0]{
    introBlurb,
    standing { value },
    seated { value },
    squareFootage { value },
    minBooking { value }
  },
  "menus": *[_id == "pageMenus"][0]{
    wines[]{ title, items[]{ title, description, price, name, note } },
    beer[]{ title, items[]{ title, description, price, name, note } },
    zeroProof[]{ title, items[]{ title, description, price, name, note } }
  }
}`

const empty: LayoutSingletons = {
  brand: null,
  home: null,
  about: null,
  eventsIndex: null,
  host: null,
  menus: null,
}

/**
 * One request for all page singletons (brand + per-route content).
 * Cached per request so multiple components share the result.
 */
export const getLayoutSingletons = cache(async (): Promise<LayoutSingletons> => {
  const client = await getClientForRequest()
  if (!client) {
    return empty
  }
  try {
    return await client.fetch<LayoutSingletons>(LAYOUT_QUERY)
  } catch (error) {
    console.error("Error fetching layout singletons from Sanity:", error)
    return empty
  }
})
