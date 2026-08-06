import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site-navigation"
import { Footer } from "@/components/footer"
import { FoodMenuView } from "@/components/food/food-menu-view"
import { MenuBackToHomeFixed } from "@/components/menu/menu-back-to-home-fixed"

export const metadata: Metadata = {
  title: {
    absolute: "Pizza & Salad Menu · Analogue Room in Solvang",
  },
  description:
    "Pizza and simple salads at our Solvang vinyl lounge: small bites meant for drinks and music, not a full meal.",
  alternates: {
    canonical: "/pizza-and-salad-menu",
  },
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
