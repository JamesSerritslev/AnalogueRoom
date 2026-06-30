import dynamic from "next/dynamic"
import { HomeScrollRestore } from "@/components/home/home-scroll-restore"
import { SiteNavigation } from "@/components/site-navigation"
import { HeroSection } from "@/components/home/hero-section"

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

const Footer = dynamic(() =>
  import("@/components/footer").then((m) => ({ default: m.Footer })),
)

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <HomeScrollRestore />
      <SiteNavigation />
      <main>
        <HeroSection />
        <PillarsSection />
        <RoomSection />
        <OfferingsSection />
        <VisitSection />
      </main>
      <Footer />
    </>
  )
}
