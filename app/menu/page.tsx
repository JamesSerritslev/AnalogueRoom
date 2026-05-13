import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site-navigation"
import { Footer } from "@/components/footer"
import { MenuBackToHomeFixed } from "@/components/menu/menu-back-to-home-fixed"
import { MenuFullPageView } from "@/components/menu/menu-full-page-view"
import { MenuHashScroll } from "@/components/menu/menu-hash-scroll"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { resolveAllMenus } from "@/lib/menu-resolve"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Menu | The Analogue Room",
  description:
    "Wine, beer, and zero-proof menus — The Analogue Room, Solvang.",
}

export default async function MenuPage() {
  const [{ innerPageHeroUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])
  const menus = resolveAllMenus(L.menus)

  return (
    <>
      <SiteNavigation />
      <MenuBackToHomeFixed />
      <MenuHashScroll />
      <main>
        <MenuFullPageView menus={menus} heroImageUrl={innerPageHeroUrl} />
      </main>
      <Footer />
    </>
  )
}
