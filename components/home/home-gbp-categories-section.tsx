import Link from "next/link"
import type { ReactNode } from "react"
import { OfferingsScrollLink } from "@/components/home/offerings-scroll-link"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"

const LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

type CategoryBlock = {
  id: string
  title: string
  body: ReactNode
}

const categories: CategoryBlock[] = [
  {
    id: "bar",
    title: "Bar & Nightlife in Solvang",
    body: (
      <>
        The Analogue Room is a walk-in bar for evenings that stay easygoing:
        wine, craft beer, zero-proof pours, and full albums on vinyl. For what
        we&apos;re pouring, see{" "}
        <OfferingsScrollLink className={LINK_CLASS}>
          drinks and listening on the menu
        </OfferingsScrollLink>
        .
      </>
    ),
  },
  {
    id: "wine-bar",
    title: "Wine Bar",
    body: (
      <>
        Local Santa Barbara County labels sit beside imports worth knowing,
        poured by the glass or bottle. Browse the
        full list on our{" "}
        <Link href={DRINKS_MENU_PATH} className={LINK_CLASS}>
          wine and beer menu
        </Link>
        .
      </>
    ),
  },
  {
    id: "vinyl-lounge",
    title: "Vinyl Lounge",
    body: (
      <>
        Each record has its own story of how it wound up in The Analogue Room.
        Shelves are stocked with a variety of records and locally built speakers
        that bring quality sound. Every open hour, records are spinning.
      </>
    ),
  },
  {
    id: "pizza",
    title: "Pizza",
    body: (
      <>
        Great-tasting pizza and salads: small bites, or a pizza for the whole
        group, meant to pair with drinks and music. See what&apos;s available on
        our{" "}
        <Link href={FOOD_MENU_PATH} className={LINK_CLASS}>
          pizza and salad menu
        </Link>
        .
      </>
    ),
  },
  {
    id: "events",
    title: "Private Events",
    body: (
      <>
        Birthdays, listening parties, and small gatherings get the vinyl library,
        bar service, and a room designed to hold a night.{" "}
        <Link href="/host-event" className={LINK_CLASS}>
          Host your event
        </Link>{" "}
        with us in Solvang.
      </>
    ),
  },
]

/**
 * GBP-aligned category H2s with in-paragraph editorial links (mini “Core” structure).
 */
export function HomeGbpCategoriesSection() {
  return (
    <section
      id="what-we-are"
      className="relative z-2 scroll-mt-20 bg-cream px-4 py-20 text-coal sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12"
    >
      <RevealOnScroll className="mx-auto mb-14 max-w-[680px] text-center sm:mb-16" eager>
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          In Solvang
        </p>
        <p className="font-display mb-6 text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-coal">
          What You&apos;ll Find <em className="not-italic text-orange">Here</em>
        </p>
        <div className="mx-auto mb-6 h-0.5 w-12 bg-orange" />
        <p className="font-body text-[15px] leading-relaxed text-coal/80">
          A vinyl lounge and wine &amp; beer bar: where great drinks, pizza, and music come together.
        </p>
      </RevealOnScroll>

      <div className="mx-auto grid max-w-[920px] gap-10 sm:gap-12">
        {categories.map((cat, idx) => (
          <RevealOnScroll key={cat.id} delay={idx * 60}>
            <div>
              <h2 className="font-display mb-3 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal">
                {cat.title}
              </h2>
              <div className="mb-4 h-px w-8 bg-orange" />
              <p className="font-body max-w-[640px] text-[15px] leading-relaxed text-coal/85">
                {cat.body}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
