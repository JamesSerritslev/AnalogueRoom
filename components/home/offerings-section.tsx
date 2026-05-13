import type { ReactNode } from "react"
import { OfferingsMenuLink } from "@/components/home/offerings-menu-link"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import type { MenuSlug } from "@/lib/menu-defaults"

export async function OfferingsSection() {
  const { offeringsSectionBgUrl } = await getSiteImagery()
  const offerings: {
    slug: MenuSlug
    title: string
    description: string
    icon: ReactNode
  }[] = [
    {
      slug: "wines",
      title: "Wines",
      description:
        "A rotating selection of local Santa Barbara County labels alongside imported pours from regions worth knowing. Curated for the moment, the music, and the mood.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h10c0 4-2 7-5 8-3-1-5-4-5-8Z" />
          <path d="M12 11v7" />
          <path d="M9 21h6" />
        </svg>
      ),
    },
    {
      slug: "beer",
      title: "Beer",
      description:
        "A thoughtful list of craft beers, both local and from further afield. Cold, fresh, and chosen to complement everything from a quiet evening to a packed Friday night.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 4h10l-1.1 15.5A2 2 0 0 1 13.9 21h-3.8a2 2 0 0 1-1.99-1.5L7 4Z" />
          <path d="M8.5 8h7" />
          <path d="M9.2 11h5.6" />
          <path d="M9.8 14h4.4" />
        </svg>
      ),
    },
    {
      slug: "zero-proof",
      title: "Zero Proof",
      description:
        "A genuine, considered non-alcoholic menu. Sodas, mocktails, alcohol-free wines and beers — because the experience matters more than the alcohol.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 7 17 17" strokeWidth="1.1" />
          <path d="M12 6.8c2 2.5 3.3 4.2 3.3 6.2a3.3 3.3 0 1 1-6.6 0c0-2 1.3-3.7 3.3-6.2Z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="offerings"
      className="relative z-2 scroll-mt-28 overflow-hidden px-4 py-20 text-cream sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${offeringsSectionBgUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth/80 via-earth/88 to-earth/92" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-[680px] text-center sm:mb-14 md:mb-16">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Drinks & Listening
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] text-cream leading-[1.05] mb-6">
            What&apos;s <span className="text-orange">On the Menu</span>
          </h2>
          <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[560px] mx-auto">
            A rotating menu, always evolving. Local where we can, imported where it makes sense, and never anything we wouldn&apos;t pour for ourselves.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {offerings.map((offering) => (
            <OfferingsMenuLink
              key={offering.slug}
              slug={offering.slug}
              className="group block border border-cream/14 bg-cream/8 px-6 pt-5 pb-8 shadow-lg shadow-black/20 backdrop-blur-[2px] transition-all duration-300 hover:border-orange hover:bg-cream/12 sm:px-8 sm:pt-6 sm:pb-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              <div className="-mt-1 mb-4 flex items-center justify-end gap-2 sm:-mt-1.5">
                <span className="font-label text-[10px] tracking-[0.35em] uppercase text-cream/55 transition-colors group-hover:text-orange">
                  View menu
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-cream/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-orange"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div className="text-orange mb-6 transition-colors group-hover:text-orange">{offering.icon}</div>
              <h3 className="font-display text-[22px] text-cream mb-3">
                {offering.title}
              </h3>
              <div className="w-6 h-px bg-orange mb-3.5" />
              <p className="font-body text-[13px] leading-relaxed text-cream/70">
                {offering.description}
              </p>
            </OfferingsMenuLink>
          ))}
        </div>
      </div>
    </section>
  )
}
