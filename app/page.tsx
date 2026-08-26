import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { HomePageClientScripts } from "@/components/home/home-page-client-scripts"
import { HomeTodayEventCta } from "@/components/home/home-today-event-cta"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { HeroSection } from "@/components/home/hero-section"
import { buildPageMetadata } from "@/lib/page-metadata"
import { getNextOneOffEvent } from "@/lib/sanity/queries"

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

export default async function HomePage() {
  const nextOneOff = await getNextOneOffEvent()

  return (
    <>
      <HomePageClientScripts />
      <SiteNavigation>
        {nextOneOff ? <HomeTodayEventCta event={nextOneOff} /> : null}
      </SiteNavigation>
      <main>
        <HeroSection hasEventCta={Boolean(nextOneOff)} />
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
