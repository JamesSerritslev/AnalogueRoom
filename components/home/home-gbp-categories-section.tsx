import Link from "next/link"
import type { ReactNode } from "react"
import { OfferingsScrollLink } from "@/components/home/offerings-scroll-link"
import { VenuePhotoImg } from "@/components/shared/venue-photo-img"
import { eventPath, formatEventDateShort } from "@/lib/events"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"
import type { Event } from "@/lib/sanity/types"
import { VENUE_PHOTOS, type VenuePhoto } from "@/lib/venue-photos"

const LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

type CategoryBlock = {
  id: string
  title: string
  body: ReactNode
  photo?: VenuePhoto
  /** Photo on the right on desktop when true (default alternates by index). */
  photoRight?: boolean
}

function nightlifeBody(upcomingEvents: Event[]) {
  const nights = upcomingEvents
    .flatMap((event) => {
      const slug = event.slug?.current?.trim()
      const title = event.title?.trim()
      if (!slug || !title) return []
      return [{ slug, title, date: event.date }]
    })
    .slice(0, 3)

  return (
    <>
      Analogue Room is a walk-in bar that&apos;s open later than most places in Solvang:
      wine, craft beer, zero-proof pours, and vinyl. For what
      we&apos;re pouring, see{" "}
      <OfferingsScrollLink className={LINK_CLASS}>
        drinks and listening on the menu
      </OfferingsScrollLink>
      .
      {nights.length > 0 ? (
        <>
          {" "}
          Upcoming nights include{" "}
          {nights.map((night, index) => (
            <span key={night.slug}>
              {index > 0 ? (index === nights.length - 1 ? ", and " : ", ") : null}
              <Link href={eventPath(night.slug)} className={LINK_CLASS}>
                {night.title}
              </Link>
              <span className="text-coal/60"> ({formatEventDateShort(night.date)})</span>
            </span>
          ))}
          . See the{" "}
          <Link href="/events" className={LINK_CLASS}>
            events calendar
          </Link>
          .
        </>
      ) : (
        <>
          {" "}
          See the{" "}
          <Link href="/events" className={LINK_CLASS}>
            events calendar
          </Link>{" "}
          for guest DJs and late nights.
        </>
      )}
    </>
  )
}

function categoryBlocks(upcomingEvents: Event[]): CategoryBlock[] {
  return [
  {
    id: "bar",
    title: "Bar & Nightlife in Solvang",
    photo: VENUE_PHOTOS.barNight,
    photoRight: true,
    body: nightlifeBody(upcomingEvents),
  },
  {
    id: "wine-bar",
    title: "Wine & Beer",
    photo: VENUE_PHOTOS.craftBeer,
    photoRight: false,
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
    photo: VENUE_PHOTOS.barPatrons,
    photoRight: true,
    body: (
      <>
        Each record has its own story of how it wound up at Analogue Room.
        Shelves are stocked with a variety of records and locally built speakers
        that bring quality sound. Every open hour, records are spinning.
      </>
    ),
  },
  {
    id: "pizza",
    title: "Pizza",
    photo: VENUE_PHOTOS.pizzaTray,
    photoRight: false,
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
    photo: VENUE_PHOTOS.storefront,
    photoRight: true,
    body: (
      <>
        Analogue Room is a great place to host your private events: Birthdays, listening parties, and small gatherings get the vinyl library,
        bar service, and a room designed for great memories.{" "}
        <Link href="/host-event" className={LINK_CLASS}>
          Host your event
        </Link>{" "}
        with us in Solvang.
      </>
    ),
  },
]
}

/**
 * GBP-aligned category H2s with in-paragraph editorial links (mini “Core” structure).
 */
export function HomeGbpCategoriesSection({
  upcomingEvents = [],
}: {
  upcomingEvents?: Event[]
}) {
  const categories = categoryBlocks(upcomingEvents)
  return (
    <section
      id="what-we-are"
      className="relative z-2 scroll-mt-20 bg-cream px-4 py-20 text-coal sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12"
    >
      <div className="mx-auto mb-14 max-w-[680px] text-center sm:mb-16">
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
      </div>

      <div className="mx-auto grid max-w-[1100px] gap-12 sm:gap-16 md:gap-20">
        {categories.map((cat) => (
          <div key={cat.id}>
            {cat.photo ? (
              <div className="grid grid-cols-1 items-center gap-5 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <figure
                  className={`w-full order-first ${
                    cat.photoRight ? "md:order-last" : "md:order-first"
                  }`}
                >
                  <VenuePhotoImg
                    photo={cat.photo}
                    sizes="(max-width: 767px) 100vw, 520px"
                    className="h-auto w-full"
                  />
                </figure>
                <div>
                  <h2 className="font-display mb-3 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal">
                    {cat.title}
                  </h2>
                  <div className="mb-4 h-px w-8 bg-orange" />
                  <p className="font-body max-w-[640px] text-[15px] leading-relaxed text-coal/85">
                    {cat.body}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="font-display mb-3 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal">
                  {cat.title}
                </h2>
                <div className="mb-4 h-px w-8 bg-orange" />
                <p className="font-body max-w-[640px] text-[15px] leading-relaxed text-coal/85">
                  {cat.body}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
