import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site-navigation"
import { Footer } from "@/components/footer"
import { FoodMenuView } from "@/components/food/food-menu-view"
import { MenuBackToHomeFixed } from "@/components/menu/menu-back-to-home-fixed"

export const metadata: Metadata = {
  title: "Food Menu | The Analogue Room",
  description:
    "Squares pizza by the slice and pan, powered by Revolver Pizza, at The Analogue Room, Solvang.",
}

export default function FoodMenuPage() {
  return (
    <>
      <SiteNavigation />
      <MenuBackToHomeFixed />
      <main>
        <FoodMenuView />
      </main>
      <Footer />
    </>
  )
}
