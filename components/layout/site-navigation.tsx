import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { Navigation } from "@/components/layout/navigation"
import { DEFAULT_HERO_META_HOURS } from "@/lib/content-defaults"

export async function SiteNavigation() {
  const [{ siteLogoUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  return (
    <Navigation
      logoSrc={siteLogoUrl}
      hoursLine={L.home?.heroMetaHours?.trim() || DEFAULT_HERO_META_HOURS}
    />
  )
}
