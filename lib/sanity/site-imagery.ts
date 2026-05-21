import { cache } from "react"
import { sanityImageUrl } from "@/lib/sanity/image-url"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

/** Fallback assets when Studio fields are empty */
const DEFAULT_INTERIOR_HERO = "/images/interior.jpeg"
const DEFAULT_SITE_LOGO = "/images/ar-logo.png"
const DEFAULT_OFFERINGS_SECTION_BG = "/images/on-the-menu.png"

type ResolvedSiteImagery = {
  homeHeroUrl: string
  innerPageHeroUrl: string
  siteLogoUrl: string
  roomTheSpaceUrl: string | null
  /** “What’s On the Menu” section background */
  offeringsSectionBgUrl: string
  /** Home hero lead; empty in Studio → use `DEFAULT_HERO_LEAD` in UI */
  heroLead: string | null
}

function resolveFromLayout(L: Awaited<ReturnType<typeof getLayoutSingletons>>): ResolvedSiteImagery {
  const homeHeroUrl =
    sanityImageUrl(L.home?.heroBackground, 2400) ?? DEFAULT_INTERIOR_HERO
  const innerPageHeroUrl =
    sanityImageUrl(L.brand?.innerHero, 2400) ?? homeHeroUrl
  const siteLogoUrl = sanityImageUrl(L.brand?.logo, 520) ?? DEFAULT_SITE_LOGO
  const roomTheSpaceUrl = sanityImageUrl(L.home?.roomSectionImage, 1200) ?? null
  const offeringsSectionBgUrl =
    sanityImageUrl(L.home?.offeringsBackground, 2400) ?? DEFAULT_OFFERINGS_SECTION_BG
  const heroLead = L.home?.heroLead || null
  return {
    homeHeroUrl,
    innerPageHeroUrl,
    siteLogoUrl,
    roomTheSpaceUrl,
    offeringsSectionBgUrl,
    heroLead,
  }
}

/**
 * Resolved logo + hero URLs from Studio singletons (`siteBrand`, `pageHome`).
 * Cached per request with `getLayoutSingletons`.
 */
export const getSiteImagery = cache(async (): Promise<ResolvedSiteImagery> => {
  const L = await getLayoutSingletons()
  return resolveFromLayout(L)
})
