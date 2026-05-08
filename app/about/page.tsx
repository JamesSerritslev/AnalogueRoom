import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About | The Analogue Room",
  description: "The story of The Analogue Room - a curated vinyl bar and listening lounge in Solvang, California.",
}

export default function AboutPage() {
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
              Solvang · California
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] text-cream leading-[1.05] mb-3.5">
              Our <em className="not-italic text-orange">Story</em>
            </h1>
            <div className="w-15 h-0.5 bg-orange mt-5" />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-25 px-6 md:px-12 max-w-[920px] mx-auto">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            The Analogue Room
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            A Room Worth <em className="not-italic text-orange">Sitting In</em>
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />

          <div className="font-body text-base leading-relaxed text-coal/85 mb-6">
            <p className="mb-4">
              <em>Story coming soon.</em> The full origin story of The Analogue Room — how it came together, what it means, and why we believe a room built around vinyl, intention, and good company is exactly what Solvang needs.
            </p>
          </div>

          <blockquote className="font-display text-[clamp(22px,3vw,30px)] text-orange leading-snug my-12 py-8 border-t-2 border-b-2 border-coal text-center">
            &ldquo;Curation. Intention. Analogue.&rdquo;
          </blockquote>

          <div className="font-body text-base leading-relaxed text-coal/85">
            <p>
              <em>More coming soon.</em> A continuation of the story — the philosophy, the music, the moments.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-coal text-cream py-25 px-6 md:px-12">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
              The People
            </p>
            <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-cream leading-[1.05] mb-6">
              Behind the <em className="not-italic text-orange">Room</em>
            </h2>
            <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
            <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70">
              A small team with a clear vision — to build a room that feels like home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
            {/* Team Member 1 */}
            <div className="bg-cream/4 border border-cream/10 px-9 py-10 text-center hover:border-orange hover:bg-orange/6 transition-all duration-300">
              <div className="w-35 h-35 rounded-full bg-cream/5 border border-dashed border-cream/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="text-cream/30"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase text-orange mb-2">
                Founder / Owner
              </p>
              <h3 className="font-display text-2xl text-cream mb-3.5">Name TBD</h3>
              <div className="w-8 h-px bg-orange mx-auto mb-4" />
              <p className="font-body text-[13px] leading-relaxed text-cream/70 italic">
                Bio coming soon.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-cream/4 border border-cream/10 px-9 py-10 text-center hover:border-orange hover:bg-orange/6 transition-all duration-300">
              <div className="w-35 h-35 rounded-full bg-cream/5 border border-dashed border-cream/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="text-cream/30"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase text-orange mb-2">
                Co-Owner / Curator
              </p>
              <h3 className="font-display text-2xl text-cream mb-3.5">Name TBD</h3>
              <div className="w-8 h-px bg-orange mx-auto mb-4" />
              <p className="font-body text-[13px] leading-relaxed text-cream/70 italic">
                Bio coming soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
