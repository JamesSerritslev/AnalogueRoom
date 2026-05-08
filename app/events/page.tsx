import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventsList } from "@/components/events/events-list"
import { getEvents } from "@/lib/sanity/queries"

export const metadata: Metadata = {
  title: "Events | The Analogue Room",
  description: "Upcoming events at The Analogue Room - listening parties, album releases, special pours, and curated nights in Solvang, CA.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[55vh] relative flex items-end px-6 md:px-12 pb-18 overflow-hidden pt-35">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('/images/interior.jpg')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-coal/50 to-coal/85" />
          </div>
          <div className="relative z-2">
            <p className="font-label text-[11px] tracking-[0.5em] uppercase text-orange mb-4">
              {"What's On"} · Solvang
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] text-cream leading-[1.05] mb-3.5">
              Events <em className="not-italic text-orange">Calendar</em>
            </h1>
            <div className="w-15 h-0.5 bg-orange mt-5" />
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 px-6 md:px-12 max-w-[920px] mx-auto text-center">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            {"What's Spinning"}
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            Upcoming <em className="not-italic text-orange">Nights</em>
          </h2>
          <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px] mx-auto">
            From listening parties and album releases to special pours and pop-ups — here&apos;s what&apos;s on at The Analogue Room.
          </p>
        </section>

        {/* Events List */}
        <section className="px-6 md:px-12 pb-25 max-w-[1100px] mx-auto">
          <EventsList events={events} />
        </section>

        {/* CTA Section */}
        <section className="bg-coal text-cream py-20 px-6 md:px-12 text-center">
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
          <a
            href="https://www.instagram.com/analogueroomsyv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-label text-[11px] tracking-[0.3em] uppercase border border-cream text-cream px-8 py-3.5 hover:bg-cream hover:text-coal transition-colors"
          >
            Follow on Instagram
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
