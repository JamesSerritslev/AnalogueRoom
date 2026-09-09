import Link from "next/link"
import { VenuePhotoImg } from "@/components/shared/venue-photo-img"
import {
  TrackedDirectionsLink,
  TrackedInstagramLink,
} from "@/components/shared/tracked-links"
import {
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
} from "@/lib/content-defaults"
import { FOOD_MENU_PATH } from "@/lib/site-routes"
import { getSiteUrl } from "@/lib/site-url"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

const FAQ_ITEMS = [
  {
    question: "Is Analogue Room a bar open late in Solvang?",
    answer:
      "Yes. We're one of the later bars in downtown Solvang: Thursday through Saturday 4pm to 10pm, Sunday and Monday 4pm to 8pm. Closed Tuesday and Wednesday.",
  },
  {
    question: "Do you have a live DJ?",
    answer:
      "Yes. Guest DJs play selected nights. Those dates are listed on this page. Other nights, our team is still spinning vinyl live in the room.",
  },
  {
    question: "Do you have live music?",
    answer:
      "Yes. Live in the analogue sense. Music is played in the room, on vinyl, through a high-fidelity system. Event nights add live DJs and listening parties. We don't run a live-band stage.",
  },
  {
    question: "Is there a cover charge?",
    answer:
      "Most nights are walk-in with no cover. If a night is ticketed, it will say so on the event.",
  },
] as const

function FaqJsonLd() {
  const pageUrl = `${getSiteUrl()}/events`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      {
        "@type": "Question",
        name: "Where are you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "1693 Mission Drive, Suite D2, Founder's Square, downtown Solvang.",
        },
      },
    ],
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** Keyword-rich events copy with venue photos, placed after the calendar. */
export function EventsSeoContent() {
  return (
    <section className="bg-cream px-4 py-16 text-coal sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
      <FaqJsonLd />
      <div className="mx-auto grid max-w-[1100px] gap-16 sm:gap-20 md:gap-24">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <figure className="grid w-full grid-cols-1 gap-2 order-first md:order-last sm:gap-3">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.nightCrowd}
              sizes="(max-width: 767px) 100vw, 520px"
            />
            <VenuePhotoImg
              photo={VENUE_PHOTOS.pizzaTray}
              sizes="(max-width: 767px) 100vw, 520px"
            />
          </figure>
          <div>
            <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              After Hours
            </p>
            <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
              A Bar Open Late in Solvang
            </h2>
            <div className="mb-5 h-px w-8 bg-orange" />
            <div className="font-body max-w-[540px] space-y-4 text-[15px] leading-relaxed text-coal/85">
              <p>
                Most of downtown Solvang winds down early. We don&apos;t. Thursday
                through Saturday we&apos;re open until 10pm, serving wine, craft
                beer, zero-proof pours, and pizza. When the rest of Mission Drive
                has gone quiet, our vinyl will continue to rotate. Sunday and Monday
                we close at 8pm. Closed Tuesday and Wednesday.
              </p>
              <p>
                Come for a{" "}
                <Link href={FOOD_MENU_PATH} className={LINK_CLASS}>
                  late-night pizza
                </Link>
                {", or come after dinner, after a tasting, or when you want to extend your fun night in the Santa Ynez Valley. Walk-in. No cover unless an event says otherwise."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <figure className="grid w-full grid-cols-1 gap-2 order-first sm:gap-3">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.boothWine}
              sizes="(max-width: 767px) 100vw, 520px"
            />
            <VenuePhotoImg
              photo={VENUE_PHOTOS.djRecords}
              sizes="(max-width: 767px) 100vw, 520px"
            />
          </figure>
          <div>
            <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              The Booth
            </p>
            <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
              Live DJ Nights
            </h2>
            <div className="mb-5 h-px w-8 bg-orange" />
            <div className="font-body max-w-[540px] space-y-4 text-[15px] leading-relaxed text-coal/85">
              <p>
                Guest DJs take over the booth for dedicated nights. Listen to
                what passionate DJs want you to hear as they mix together stacks
                of vinyl, some of which are from their own collections. Come
                grab a glass and enjoy the energy our live DJ nights bring.
              </p>
              <p>
                When a live DJ is booked, it shows on this calendar. Follow{" "}
                <TrackedInstagramLink
                  href={DEFAULT_INSTAGRAM_URL}
                  placement="events_seo_instagram"
                  className={LINK_CLASS}
                >
                  {DEFAULT_INSTAGRAM_HANDLE}
                </TrackedInstagramLink>{" "}
                or{" "}
                <a href="#newsletter" className={LINK_CLASS}>
                  sign up on our list
                </a>{" "}
                to keep up to date with our upcoming events.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              Good to Know
            </p>
            <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
              Questions
            </h2>
            <div className="mb-8 h-px w-8 bg-orange" />
            <dl className="divide-y divide-coal/12 border-t border-coal/12">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="py-5">
                  <dt className="font-display text-[17px] leading-snug text-coal sm:text-[18px]">
                    {item.question}
                  </dt>
                  <dd className="font-body mt-2 text-[15px] leading-relaxed text-coal/80">
                    {item.answer}
                  </dd>
                </div>
              ))}
              <div className="py-5">
                <dt className="font-display text-[17px] leading-snug text-coal sm:text-[18px]">
                  Where are you?
                </dt>
                <dd className="font-body mt-2 text-[15px] leading-relaxed text-coal/80">
                  <TrackedDirectionsLink
                    placement="events_seo_address"
                    className={LINK_CLASS}
                  >
                    1693 Mission Drive, Suite D2
                  </TrackedDirectionsLink>
                  , Founder&apos;s Square, downtown Solvang.
                </dd>
              </div>
            </dl>
          </div>
          <figure className="w-full md:sticky md:top-28">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.storefront}
              sizes="(max-width: 767px) 100vw, 520px"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
