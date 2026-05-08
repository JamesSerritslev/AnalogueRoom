import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PillarsSection } from "@/components/home/pillars-section"
import { RoomSection } from "@/components/home/room-section"
import { OfferingsSection } from "@/components/home/offerings-section"
import { VisitSection } from "@/components/home/visit-section"

export default function HomePage() {
  return (
    <>
      <Navigation />
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
