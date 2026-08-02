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
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { resolveMenuSections } from "@/lib/menu-resolve"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

export const revalidate = 60

export const metadata: Metadata = {
  title: {
    absolute: "Wine & Beer Menu | Analogue Room in Solvang",
  },
  description:
    "Wines, craft beer, and zero-proof pours at The Analogue Room: a vinyl lounge and bar in Solvang, CA.",
  alternates: {
    canonical: "/wine-and-beer-menu",
  },
}

export default async function WineAndBeerMenuPage() {
  const L = await getLayoutSingletons()
  const sections = resolveMenuSections(L.menus)
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
          sections={sections}
          heroImageUrl={VENUE_PHOTOS.wineShelf.src}
          heroEyebrow={heroEyebrow}
          heroTitle={heroTitle}
          heroLead={heroLead}
        />
      </main>
      <Footer />
    </>
  )
}
