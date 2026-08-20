import type { Metadata } from "next"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { Footer } from "@/components/layout/footer"
import { FoodMenuView } from "@/components/food/food-menu-view"
import { buildPageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "Pizza & Salad Menu · Analogue Room in Solvang",
  description:
    "Pizza and simple salads at our Solvang vinyl lounge: small bites meant for drinks and music, not a full meal.",
  keywords: [
    "best pizza solvang",
    "pizza in solvang",
    "food",
    "menu",
  ],
  path: "/pizza-and-salad-menu",
})

export default function FoodMenuPage() {
  return (
    <>
      <SiteNavigation />
      <main>
        <FoodMenuView />
      </main>
      <Footer />
    </>
  )
}
