import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { HomePageClientScripts } from "@/components/home/home-page-client-scripts"
import { SiteNavigation } from "@/components/site-navigation"
import { HeroSection } from "@/components/home/hero-section"

export const metadata: Metadata = {
  title: {
    absolute: "Bars in Solvang | Vinyl Lounge · Analogue Room",
  },
  description:
    "A vinyl lounge and wine & beer bar for Solvang nightlife: full albums, thoughtful pours, at 1693 Mission Drive, Suite D2.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bars in Solvang | Vinyl Lounge · Analogue Room",
    description:
      "A vinyl lounge and wine & beer bar for Solvang nightlife: full albums, thoughtful pours, at 1693 Mission Drive, Suite D2.",
    url: "/",
  },
}

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
  import("@/components/footer").then((m) => ({ default: m.Footer })),
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
