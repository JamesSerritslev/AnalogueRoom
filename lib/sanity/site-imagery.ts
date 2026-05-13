import { cache } from "react"
import { client } from "@/lib/sanity/client"
import { sanityImageUrl } from "@/lib/sanity/image-url"
import type { SiteImagery } from "@/lib/sanity/types"

export const SITE_IMAGERY_DOC_ID = "siteImagery"

/** Fallback assets when Studio fields are empty */
export const DEFAULT_INTERIOR_HERO = "/images/interior.jpeg"
export const DEFAULT_SITE_LOGO = "/images/ar-logo.png"

export type ResolvedSiteImagery = {
  homeHeroUrl: string
  innerPageHeroUrl: string
  siteLogoUrl: string
  /** When null, Room section keeps the CSS vinyl graphic */
  roomTheSpaceUrl: string | null
}

function resolve(doc: SiteImagery | null | undefined): ResolvedSiteImagery {
  const homeHeroUrl =
    sanityImageUrl(doc?.homeHero, 2400) ?? DEFAULT_INTERIOR_HERO
  const innerPageHeroUrl =
    sanityImageUrl(doc?.innerPageHero, 2400) ?? homeHeroUrl
  const siteLogoUrl = sanityImageUrl(doc?.logo, 520) ?? DEFAULT_SITE_LOGO
  const roomTheSpaceUrl = sanityImageUrl(doc?.roomTheSpace, 1200) ?? null
  return {
    homeHeroUrl,
    innerPageHeroUrl,
    siteLogoUrl,
    roomTheSpaceUrl,
  }
}

/**
 * Singleton `siteImagery` — heroes, logo, optional “The Space” photo.
 * Cached per request so nav + footer + sections share one fetch.
 */
export const getSiteImagery = cache(async (): Promise<ResolvedSiteImagery> => {
  if (!client) {
    return resolve(null)
  }

  try {
    const doc = await client.fetch<SiteImagery | null>(
      `*[_type == "siteImagery" && _id == $id][0]{
        _id,
        homeHero,
        innerPageHero,
        logo,
        roomTheSpace
      }`,
      { id: SITE_IMAGERY_DOC_ID },
    )
    return resolve(doc)
  } catch (error) {
    console.error("Error fetching site imagery from Sanity:", error)
    return resolve(null)
  }
})
