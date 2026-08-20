import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { HomePageClientScripts } from "@/components/home/home-page-client-scripts"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { HeroSection } from "@/components/home/hero-section"
import { buildPageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "Analogue Room · Vinyl Bar & Lounge in Solvang, CA",
  description:
    "Analogue Room is a vinyl bar and lounge in Solvang, CA: wine, craft beer, zero-proof pours, and full albums on vinyl at 1693 Mission Drive, Suite D2.",
  keywords: [
    "wine bar",
    "best wine",
    "beer",
    "live vinyl music",
    "best pizza",
    "nightlife",
    "restaurant",
    "local winery",
  ],
  path: "/",
})


const PillarsSection = dynamic(() =>
  import("@/components/home/pillars-section").then((m) => ({
    default: m.PillarsSection,
  })),
)

const RoomSection = dynamic(() =>
  import("@/components/home/room-section").then((m) => ({
    default: m.RoomSection,
  })),
)

const HomeGbpCategoriesSection = dynamic(() =>
  import("@/components/home/home-gbp-categories-section").then((m) => ({
    default: m.HomeGbpCategoriesSection,
  })),
)

const OfferingsSection = dynamic(() =>
  import("@/components/home/offerings-section").then((m) => ({
    default: m.OfferingsSection,
  })),
)

const VisitSection = dynamic(() =>
  import("@/components/home/visit-section").then((m) => ({
    default: m.VisitSection,
  })),
)

const HomeReviewsSection = dynamic(() =>
  import("@/components/home/home-reviews-section").then((m) => ({
    default: m.HomeReviewsSection,
  })),
)

const Footer = dynamic(() =>
  import("@/components/layout/footer").then((m) => ({ default: m.Footer })),
)

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <HomePageClientScripts />
      <SiteNavigation />
      <main>
        <HeroSection />
        <PillarsSection />
        <RoomSection />
        <HomeGbpCategoriesSection />
        <OfferingsSection />
        <VisitSection />
        <HomeReviewsSection />
      </main>
      <Footer />
    </>
  )
}
