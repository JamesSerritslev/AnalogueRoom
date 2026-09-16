import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"
import { VenuePhotoImg } from "@/components/shared/venue-photo-img"
import {
  TrackedDirectionsLink,
  TrackedInstagramLink,
} from "@/components/shared/tracked-links"
import {
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
} from "@/lib/content-defaults"
import { eventPath, formatEventDate, formatEventDateShort } from "@/lib/events"
import { buildPageMetadata } from "@/lib/page-metadata"
import { getEvents, getEventBySlug, isEventListed } from "@/lib/sanity/queries"
import type { Event } from "@/lib/sanity/types"
import { getSiteUrl } from "@/lib/site-url"
import {
  DRINKS_MENU_PATH,
  FOOD_MENU_PATH,
  OKTOBERFEST_SOLVANG_PATH,
} from "@/lib/site-routes"
import {
  VENUE_ADDRESS_SINGLE_LINE,
  VENUE_NAME,
  VENUE_PHONE_DISPLAY,
  getVenuePhoneTelHref,
} from "@/lib/venue-location"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

export const revalidate = 60

const PAGE_TITLE =
  "Oktoberfest Solvang 2026 · Analogue Room Oktoberfest Sept 25"
const PAGE_DESCRIPTION =
  "Looking for things to do during Oktoberfest Solvang? Analogue Room Oktoberfest is on September 25, 2026. Expect German music on vinyl and German imported Bavarian-style beers at our downtown Solvang vinyl lounge."

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Oktoberfest Solvang",
    "Solvang Oktoberfest",
    "Oktoberfest Solvang 2026",
    "Solvang Oktoberfest 2026",
    "Oktoberfest near me Solvang",
    "German beer Solvang",
    "Bavarian beer Solvang",
    "Oktoberfest Santa Ynez Valley",
    "Analogue Room Oktoberfest",
    "vinyl bar Solvang",
    "beer bar Solvang",
    "nightlife Solvang",
  ],
  path: OKTOBERFEST_SOLVANG_PATH,
})

const LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

const H2_CLASS =
  "font-display mb-3 mt-12 text-[clamp(26px,3.4vw,36px)] leading-[1.08] text-coal first:mt-0"

const P_CLASS = "font-body mb-4 text-[15px] leading-relaxed text-coal/85"

const CANDIDATE_SLUGS = [
  "oktoberfest",
  "analogue-room-presents-oktoberfest",
  "analogue-room-oktoberfest",
  "oktoberfest-2026",
  "oktoberfest-sept-25",
  "oktoberfest-sep-25",
] as const

const FALLBACK_EVENT = {
  title: "Analogue Room Oktoberfest",
  date: "2026-09-25",
  description:
    "Experience German music on vinyl. Pour from a selection of German imported and Bavarian style beers. Enjoy everything Analogue Room has to offer.",
} as const

async function resolveOktoberfestEvent(): Promise<Event | null> {
  for (const slug of CANDIDATE_SLUGS) {
    const bySlug = await getEventBySlug(slug)
    if (bySlug) return bySlug
  }

  const upcoming = await getEvents()
  return (
    upcoming.find((event) => {
      const haystack = `${event.title ?? ""} ${event.slug?.current ?? ""} ${event.description ?? ""}`
      return /oktoberfest/i.test(haystack)
    }) ?? null
  )
}

function EventJsonLd({
  event,
  pageUrl,
  eventUrl,
}: {
  event: {
    title: string
    date: string
    time?: string
    description: string
  }
  pageUrl: string
  eventUrl: string
}) {
  const phone = getVenuePhoneTelHref()
  const startDate = event.time?.trim()
    ? `${event.date}T${normalizeTimeForSchema(event.time)}`
    : event.date

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: eventUrl,
    image: [`${getSiteUrl()}/images/og.png`],
    location: {
      "@type": "Place",
      name: VENUE_NAME,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1693 Mission Drive, Suite D2",
        addressLocality: "Solvang",
        addressRegion: "CA",
        postalCode: "93463",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: VENUE_NAME,
      url: getSiteUrl(),
      ...(phone ? { telephone: phone } : {}),
    },
    offers: {
      "@type": "Offer",
      url: eventUrl,
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      validFrom: "2026-09-01",
    },
    mainEntityOfPage: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function FaqJsonLd({ pageUrl }: { pageUrl: string }) {
  const faqs = [
    {
      question: "Where is Oktoberfest in Solvang in 2026?",
      answer:
        "Analogue Room Oktoberfest is on September 25, 2026 at 1693 Mission Drive, Suite D2 in downtown Solvang. Guests can walk in for German music on vinyl. The bar pours German imported and Bavarian-style beers.",
    },
    {
      question: "When is Analogue Room Oktoberfest?",
      answer:
        "Analogue Room Oktoberfest is on Friday, September 25, 2026 in Solvang, California.",
    },
    {
      question: "What happens at Analogue Room Oktoberfest?",
      answer:
        "Expect German music on vinyl. The bar pours German imported and Bavarian-style beers. You get the usual Analogue Room night in a vinyl lounge with a walk-in bar in downtown Solvang.",
    },
    {
      question: "Do I need tickets for Oktoberfest at Analogue Room?",
      answer:
        "Most nights at Analogue Room are walk-in. Check the Oktoberfest event page on analogueroom.com for any ticket or RSVP details.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** Turn display times like "4pm" / "7:30 PM" into HH:MM:SS for schema when possible. */
function normalizeTimeForSchema(time: string): string {
  const cleaned = time.trim().toLowerCase().replace(/\s+/g, "")
  const match = /^(\d{1,2})(?::(\d{2}))?(am|pm)?$/.exec(cleaned)
  if (!match) return "16:00:00"
  let hour = Number(match[1])
  const minute = match[2] ? Number(match[2]) : 0
  const meridiem = match[3]
  if (meridiem === "pm" && hour < 12) hour += 12
  if (meridiem === "am" && hour === 12) hour = 0
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`
}

export default async function OktoberfestSolvangPage() {
  const cmsEvent = await resolveOktoberfestEvent()
  const listed = cmsEvent ? isEventListed(cmsEvent) : true
  const title = cmsEvent?.title?.trim() || FALLBACK_EVENT.title
  const date = cmsEvent?.date || FALLBACK_EVENT.date
  const time = cmsEvent?.time?.trim()
  const description =
    cmsEvent?.description?.trim() || FALLBACK_EVENT.description
  const slug = cmsEvent?.slug?.current?.trim()
  const eventHref = slug ? eventPath(slug) : "/events"
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}${OKTOBERFEST_SOLVANG_PATH}`
  const eventUrl = slug ? `${siteUrl}${eventHref}` : pageUrl
  const phoneTel = getVenuePhoneTelHref()

  return (
    <>
      <main>
        <EventJsonLd
          event={{ title, date, time, description }}
          pageUrl={pageUrl}
          eventUrl={eventUrl}
        />
        <FaqJsonLd pageUrl={pageUrl} />

        <article className="mx-auto max-w-[720px] px-4 pb-16 pt-page-hero sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:px-12">
          <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
            Solvang · California · 2026
          </p>
          <h1 className="font-display mb-4 text-[clamp(34px,5vw,54px)] leading-[1.05] text-coal">
            Oktoberfest in <em className="not-italic text-orange">Solvang</em>
          </h1>
          <div className="mb-6 h-0.5 w-12 bg-orange" />
          <p className={P_CLASS}>
            Searching for things to do during{" "}
            <strong>Oktoberfest Solvang</strong>? Analogue Room is hosting{" "}
            <strong>Analogue Room Oktoberfest</strong> on{" "}
            <strong>{formatEventDate(date)}</strong>
            {time ? (
              <>
                {" "}
                at <strong>{time}</strong>
              </>
            ) : null}{" "}
            in downtown Solvang. It is a walk-in night with German music on
            vinyl. The bar pours German imported and Bavarian-style beers. You
            also get everything Analogue Room is known for in a vinyl lounge
            with late-night energy in the Santa Ynez Valley.
          </p>

          <div className="my-8 border border-coal/10 bg-parched/40 px-5 py-6 sm:px-7 sm:py-7">
            <p className="font-label mb-2 text-[10px] tracking-[0.35em] text-orange uppercase">
              Featured night
            </p>
            <h2 className="font-display mb-3 text-[clamp(28px,4vw,40px)] leading-[1.08] text-coal">
              {title}
            </h2>
            <p className="font-body mb-2 text-[15px] text-coal/80">
              <span className="font-label mr-2 text-[10px] tracking-[0.2em] text-orange uppercase">
                When
              </span>
              {formatEventDate(date)}
              {time ? ` · ${time}` : null}
            </p>
            <p className="font-body mb-5 text-[15px] leading-relaxed text-coal/85">
              {description}
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={eventHref}
                className="inline-flex min-h-11 items-center justify-center bg-orange px-7 py-3 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
              >
                {listed ? "See Oktoberfest event" : "View event details"}
              </Link>
              <TrackedDirectionsLink
                placement="oktoberfest_directions"
                className="font-label inline-flex min-h-11 items-center justify-center border border-coal px-6 py-3 text-[11px] tracking-[0.24em] text-coal uppercase transition-colors hover:bg-coal hover:text-cream"
              >
                Get directions
              </TrackedDirectionsLink>
            </div>
          </div>

          <div className="mb-10">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.craftBeer}
              sizes="(max-width: 767px) 100vw, 720px"
              className="h-auto w-full"
              priority
            />
          </div>

          <h2 className={H2_CLASS}>What is Oktoberfest in Solvang?</h2>
          <p className={P_CLASS}>
            Solvang is a Danish-inspired town in Santa Barbara County. Every
            fall visitors look for{" "}
            <strong>Oktoberfest celebrations in Solvang</strong>. People come
            for beer. They come for music. They gather across the Santa Ynez
            Valley. Analogue Room&apos;s Oktoberfest night is a local
            lounge-scale take on that season. German records spin on the
            turntable. Bavarian-style and German imported beers sit at the bar.
            The room is built for staying awhile.
          </p>
          <p className={P_CLASS}>
            If you are comparing options for{" "}
            <strong>Oktoberfest Solvang 2026</strong>, put Analogue Room on the
            list. The address is {VENUE_ADDRESS_SINGLE_LINE} in Founder&apos;s
            Square on Mission Drive. Phone:{" "}
            {phoneTel ? (
              <a href={phoneTel} className={LINK_CLASS}>
                {VENUE_PHONE_DISPLAY}
              </a>
            ) : (
              VENUE_PHONE_DISPLAY
            )}
            .
          </p>

          <h2 className={H2_CLASS}>Analogue Room Oktoberfest</h2>
          <p className={P_CLASS}>
            On {formatEventDateShort(date)}, Analogue Room hosts Oktoberfest
            with a clear focus. Hear{" "}
            <strong>German music on vinyl</strong>. Pour from a{" "}
            <strong>
              selection of German imported and Bavarian-style beers
            </strong>
            . You also get the full Analogue Room experience. Vinyl shelves
            fill the wall. Warm light sets the mood. Side Hustle Pizza is on
            the menu. The bar stays open later than most places on Mission
            Drive.
          </p>
          <p className={P_CLASS}>
            This is not a stadium festival. It is a Solvang vinyl lounge and
            beer night. Walk in. Grab a pour. Listen. See the{" "}
            <Link href={eventHref} className={LINK_CLASS}>
              Oktoberfest event page
            </Link>
            . Browse the{" "}
            <Link href={DRINKS_MENU_PATH} className={LINK_CLASS}>
              wine and beer menu
            </Link>
            . Check{" "}
            <Link href={FOOD_MENU_PATH} className={LINK_CLASS}>
              pizza and salads
            </Link>{" "}
            before you come.
          </p>

          <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.barCrowd}
              sizes="(max-width: 767px) 100vw, 360px"
              className="h-auto w-full"
            />
            <VenuePhotoImg
              photo={VENUE_PHOTOS.djBooth}
              sizes="(max-width: 767px) 100vw, 360px"
              className="h-auto w-full"
            />
          </div>

          <h2 className={H2_CLASS}>Where to go for Solvang Oktoberfest</h2>
          <p className={P_CLASS}>
            Analogue Room is a vinyl bar and lounge at {VENUE_ADDRESS_SINGLE_LINE}.
            For <strong>Oktoberfest near Solvang</strong>, travelers staying in
            Buellton or Los Olivos will find downtown Solvang a short drive. The
            same is true from Santa Ynez or Santa Barbara. Hours on typical nights
            are Thursday through Saturday 4pm to 10pm. Sunday and Monday run
            4pm to 8pm. Confirm the Oktoberfest event listing for any special
            timing on September 25.
          </p>
          <p className={P_CLASS}>
            Follow{" "}
            <TrackedInstagramLink
              href={DEFAULT_INSTAGRAM_URL}
              placement="oktoberfest_instagram"
              className={LINK_CLASS}
            >
              {DEFAULT_INSTAGRAM_HANDLE}
            </TrackedInstagramLink>{" "}
            for night-of updates. See the full{" "}
            <Link href="/events" className={LINK_CLASS}>
              events calendar
            </Link>{" "}
            for other nights.
          </p>

          <h2 className={H2_CLASS}>FAQ: Oktoberfest Solvang</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display mb-2 text-[clamp(20px,2.5vw,26px)] text-coal">
                Is there an Oktoberfest in Solvang in 2026?
              </h3>
              <p className={P_CLASS}>
                Yes. Analogue Room Oktoberfest is on September 25, 2026 in
                downtown Solvang. German vinyl spins in the room. German
                imported and Bavarian-style beers are on the bar.
              </p>
            </div>
            <div>
              <h3 className="font-display mb-2 text-[clamp(20px,2.5vw,26px)] text-coal">
                What should I expect at Analogue Room Oktoberfest?
              </h3>
              <p className={P_CLASS}>
                German music on vinyl. Bavarian-style and German imported beers
                at the bar. Analogue Room&apos;s vinyl lounge setting with
                drinks and pizza. It is a Solvang bar night with an Oktoberfest
                theme.
              </p>
            </div>
            <div>
              <h3 className="font-display mb-2 text-[clamp(20px,2.5vw,26px)] text-coal">
                Where is Analogue Room?
              </h3>
              <p className={P_CLASS}>
                {VENUE_ADDRESS_SINGLE_LINE}.{" "}
                <TrackedDirectionsLink
                  placement="oktoberfest_faq_directions"
                  className={LINK_CLASS}
                >
                  Open in maps
                </TrackedDirectionsLink>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-coal/10 pt-8 text-center">
            <p className="font-body mb-5 text-[15px] leading-relaxed text-coal/80">
              Plan your Solvang Oktoberfest night at Analogue Room on September
              25, 2026.
            </p>
            <Link
              href={eventHref}
              className="inline-flex min-h-11 items-center justify-center bg-coal px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-orange"
            >
              Analogue Room Oktoberfest details
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
