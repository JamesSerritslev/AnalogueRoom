import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site-navigation"
import { Footer } from "@/components/footer"
import { MenuBackToHomeFixed } from "@/components/menu/menu-back-to-home-fixed"
import { MenuFullPageView } from "@/components/menu/menu-full-page-view"
import { MenuHashScroll } from "@/components/menu/menu-hash-scroll"
import {
  DEFAULT_OFFERINGS_BODY,
  DEFAULT_OFFERINGS_EYEBROW,
  DEFAULT_OFFERINGS_HEADLINE,
} from "@/lib/content-defaults"
import { getSiteImagery, resolvePageHeroUrl } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { resolveAllMenus } from "@/lib/menu-resolve"

export const revalidate = 60

/** Set to `false` when menus are ready to publish. */
const MENU_PAGE_COMING_SOON = true

export const metadata: Metadata = {
  title: "Menu | The Analogue Room",
  description: MENU_PAGE_COMING_SOON
    ? "Menu coming soon — wine, beer, and zero‑proof menus from The Analogue Room, Solvang."
    : "Wine, beer, and zero-proof menus from The Analogue Room, Solvang.",
}

export default async function MenuPage() {
  const [{ homeHeroUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])
  const pageHeroUrl = resolvePageHeroUrl(L.menus?.heroBackground, homeHeroUrl)
  const menus = resolveAllMenus(L.menus)
  const heroEyebrow = L.home?.offeringsEyebrow ?? DEFAULT_OFFERINGS_EYEBROW
  const heroTitle = L.home?.offeringsHeadline ?? DEFAULT_OFFERINGS_HEADLINE
  const heroLead = L.home?.offeringsBody ?? DEFAULT_OFFERINGS_BODY

  return (
    <>
      <SiteNavigation />
      <MenuBackToHomeFixed />
      <MenuHashScroll />
      <main>
        <MenuFullPageView
          menus={menus}
          heroImageUrl={pageHeroUrl}
          heroEyebrow={heroEyebrow}
          heroTitle={heroTitle}
          heroLead={heroLead}
          comingSoon={MENU_PAGE_COMING_SOON}
        />
      </main>
      <Footer />
    </>
  )
}
