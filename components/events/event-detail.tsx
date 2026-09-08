import Link from "next/link"
import { EventBody } from "@/components/events/event-body"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import { EventShareButton } from "@/components/events/event-share-button"
import { eventPath, formatEventDate, formatEventDateShort, visibleEventType } from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"
import type { Event } from "@/lib/sanity/types"

const EVENT_SEO_LINK =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

export function EventDetail({
  event,
  listed = true,
}: {
  event: Event
  listed?: boolean
}) {
  const dateLine = formatEventDate(event.date)
  const eventType = visibleEventType(event.eventType)
  const slug = event.slug?.current?.trim()
  const sharePath = slug ? eventPath(slug) : undefined

  return (
    <article className="mx-auto max-w-[720px] px-4 pb-12 pt-page-hero sm:px-6 sm:pb-14 md:px-10 md:pb-16 lg:px-12">
      <p className="mb-10 text-center sm:mb-12">
          <Link
            href="/events"
            className="font-label text-[10px] tracking-[0.35em] text-orange uppercase transition-colors hover:text-coal"
          >
            ← Events Calendar
          </Link>
        </p>

        <header className="mb-8 text-center sm:mb-10">
          {eventType ? (
            <p className="font-label mb-3 text-[10px] tracking-[0.4em] text-orange uppercase">
              {eventType}
            </p>
          ) : null}
          <h1 className="font-display mb-4 text-[clamp(32px,5vw,48px)] leading-[1.05] text-coal">
            {listed
              ? event.title || "Event Title TBD"
              : `${event.title || "Event Title TBD"} · ${formatEventDateShort(event.date)}`}
          </h1>
          <div className="mx-auto mb-4 h-0.5 w-10 bg-orange" />
          <p className="font-body text-[15px] text-coal/80">
            <span className="font-label mr-2 text-[10px] tracking-[0.2em] text-orange uppercase">
              When
            </span>
            {dateLine}
            {event.time ? ` · ${event.time}` : null}
          </p>
          {event.recurring && event.happensOn ? (
            <p className="font-label mt-2 text-[10px] tracking-[0.28em] text-orange uppercase">
              {formatEveryWeekday(event.happensOn)}
            </p>
          ) : null}
          {!listed ? (
            <p className="font-body mt-4 text-[15px] text-coal/70">
              This night has passed.{" "}
              <Link
                href="/events"
                className="text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"
              >
                See upcoming events
              </Link>
              .
            </p>
          ) : null}
          {sharePath ? (
            <div className="mt-6">
              <EventShareButton
                title={event.title || "Event at The Analogue Room"}
                dateLine={dateLine}
                time={event.time}
                path={sharePath}
              />
            </div>
          ) : null}
        </header>

      <EventFeatureImage image={event.image} title={event.title} priority />

      {event.longDescription?.length ? (
        <EventBody value={event.longDescription} />
      ) : null}

      {listed && event.ticketUrl ? (
        <div className="mt-10 border-t border-coal/10 pt-8 text-center">
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-orange px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
            >
              Tickets / RSVP
            </a>
          </div>
      ) : null}

      <section className="mt-12 border-t border-coal/10 pt-10 text-left">
        <h2 className="font-display mb-3 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal">
          The Analogue Room
        </h2>
        <div className="font-body space-y-4 text-[15px] leading-relaxed text-coal/85">
          <p>
            We&apos;re at 1693 Mission Drive, Suite D2, in Founder&apos;s Square.
            Open Thursday through Saturday 4pm to 10pm, Sunday and Monday 4pm to
            8pm. Closed Tuesday and Wednesday. Pour wine, craft beer, and
            zero-proof drinks, and pair them with Side Hustle Pizza focaccia pies
            and salads.
          </p>
          <p>
            See the{" "}
            <Link href={DRINKS_MENU_PATH} className={EVENT_SEO_LINK}>
              wine and beer menu
            </Link>
            , the{" "}
            <Link href={FOOD_MENU_PATH} className={EVENT_SEO_LINK}>
              pizza and salad menu
            </Link>
            , or the{" "}
            <Link href="/events" className={EVENT_SEO_LINK}>
              full events calendar
            </Link>
            . Private bookings are open on{" "}
            <Link href="/host-event" className={EVENT_SEO_LINK}>
              Host Your Event
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  )
}
