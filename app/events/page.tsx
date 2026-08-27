import type { Metadata } from "next"
import { Footer } from "@/components/layout/footer"
import { EventsList } from "@/components/events/events-list"
import { EventsSeoContent } from "@/components/events/events-seo-content"
import { VenueHeroCollage } from "@/components/shared/venue-hero-collage"
import { getEvents } from "@/lib/sanity/queries"
import { DEFAULT_EVENTS_INDEX_INTRO, DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
import { buildPageMetadata } from "@/lib/page-metadata"
import { InteriorHeroText } from "@/components/shared/interior-hero-text"
import { TrackedInstagramLink } from "@/components/shared/tracked-links"

export const metadata: Metadata = buildPageMetadata({
  title: "Events · Live DJ & Late Nights in Solvang",
  description:
    "Guest DJs, vinyl spun live in the room, and a bar open later than most of Solvang. See what's on at Analogue Room: wine, beer, pizza, and live music from the booth.",
  keywords: [
    "bars open late",
    "bars open late Solvang",
    "live DJ",
    "live DJ Solvang",
    "live music",
    "live music Solvang",
    "live vinyl music",
    "guest DJ",
    "nightlife Solvang",
    "wine bar",
    "beer bar",
  ],
  path: "/events",
})


export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      <main>
        <section className="relative flex min-h-[52vh] items-end overflow-hidden px-4 pb-14 pt-page-hero sm:min-h-[58vh] sm:px-6 sm:pb-16 md:px-10 md:pb-[4.5rem] lg:px-12">
          <VenueHeroCollage />
          <InteriorHeroText eyebrow={"What's On · Solvang"}>
            Events <em className="not-italic text-orange">Calendar</em>
          </InteriorHeroText>
        </section>

        <section className="mx-auto max-w-[920px] px-4 py-16 text-center sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            {"What's Spinning"}
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            Upcoming <em className="not-italic text-orange">Nights</em>
          </h2>
          <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[640px] mx-auto">
            {DEFAULT_EVENTS_INDEX_INTRO}
          </p>
        </section>

        <section className="mx-auto max-w-[720px] px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 md:pb-28 lg:px-12">
          <EventsList events={events} />
        </section>

        <EventsSeoContent />

        <section className="bg-coal px-4 py-16 text-center text-cream sm:px-6 sm:py-20 md:px-10 md:py-22 lg:px-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Stay in the Loop
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-cream leading-[1.05] mb-6">
            Follow For <em className="not-italic text-orange">Updates</em>
          </h2>
          <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[520px] mx-auto mb-8">
            New events drop on Instagram first. Follow @analogueroomsyv for the latest.
          </p>
          <TrackedInstagramLink
            href={DEFAULT_INSTAGRAM_URL}
            placement="events_cta"
            className="inline-flex min-h-11 items-center justify-center border border-cream px-6 py-3 font-label text-[11px] tracking-[0.28em] uppercase text-cream transition-colors hover:bg-cream hover:text-coal sm:min-h-0 sm:px-8 sm:py-3.5 sm:tracking-[0.3em]"
          >
            Follow on Instagram
          </TrackedInstagramLink>
        </section>
      </main>
      <Footer />
    </>
  )
}
