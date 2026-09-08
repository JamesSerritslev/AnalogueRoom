import type { ReactNode } from "react"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { getNextOneOffEvent } from "@/lib/sanity/queries"
import { Navigation } from "@/components/layout/navigation"
import { DEFAULT_HERO_META_HOURS } from "@/lib/content-defaults"

export async function SiteNavigation({ children }: { children?: ReactNode }) {
  const [{ siteLogoUrl }, L, homeEvent] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
    getNextOneOffEvent(),
  ])

  return (
    <Navigation
      logoSrc={siteLogoUrl}
      hoursLine={L.home?.heroMetaHours?.trim() || DEFAULT_HERO_META_HOURS}
      homeEvent={homeEvent}
    >
      {children}
    </Navigation>
  )
}
