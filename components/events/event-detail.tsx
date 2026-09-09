import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { EventBody } from "@/components/events/event-body"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import { EventShareButton } from "@/components/events/event-share-button"
import { eventPageLead } from "@/lib/event-page-copy"
import { eventPath, formatEventDate, formatEventDateShort, visibleEventType } from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"
import type { Event } from "@/lib/sanity/types"

const EVENT_SEO_LINK =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

export function EventDetail({
  event,
  listed = true,
  relatedEvents = [],
}: {
  event: Event
  listed?: boolean
  relatedEvents?: Event[]
}) {
  const dateLine = formatEventDate(event.date)
  const eventType = visibleEventType(event.eventType)
  const slug = event.slug?.current?.trim()
  const sharePath = slug ? eventPath(slug) : undefined
  const shortDescription = event.description?.trim()
  const hasFullDescription = Boolean(event.longDescription?.length)

  return (
    <article className="mx-auto max-w-[720px] px-4 pb-12 pt-[max(5.25rem,calc(3.75rem+env(safe-area-inset-top,0px)))] sm:px-6 sm:pb-14 sm:pt-[max(7.5rem,calc(4.5rem+env(safe-area-inset-top,0px)))] md:px-10 md:pb-16 lg:px-12 lg:pt-[max(8.75rem,calc(5.65rem+env(safe-area-inset-top,0px)))]">
      <p className="mb-8 sm:mb-12 sm:text-center">
        <Link
          href="/events"
          className="font-label inline-flex min-h-11 items-center gap-1 rounded-sm -ml-2 px-3 py-2.5 text-[12px] tracking-[0.16em] text-orange uppercase transition-colors hover:text-coal active:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:ml-0 sm:min-h-0 sm:px-0 sm:py-0 sm:text-[10px] sm:tracking-[0.35em]"
        >
          <ChevronLeft className="h-5 w-5 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={2} aria-hidden />
          Events Calendar
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
      </header>

      <div className="mb-8 sm:mb-10">
        <EventFeatureImage
          image={event.image}
          title={event.title}
          priority
          className="mb-0 sm:mb-0"
        />
        {sharePath ? (
          <div className="mt-3 text-center sm:mt-4">
            <EventShareButton
              title={event.title || "Event at Analogue Room"}
              dateLine={dateLine}
              time={event.time}
              path={sharePath}
            />
          </div>
        ) : null}
      </div>

      {hasFullDescription ? (
        <EventBody value={event.longDescription!} />
      ) : shortDescription ? (
        <p className="font-body mt-2 text-[16px] leading-relaxed text-coal/88">
          {shortDescription}
        </p>
      ) : null}

      <p className="font-body mt-8 text-[16px] leading-relaxed text-coal/88">
        {eventPageLead(event)}
      </p>

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
          Analogue Room
        </h2>
        <div className="font-body space-y-4 text-[15px] leading-relaxed text-coal/85">
          <p>
            Analogue Room sits at 1693 Mission Drive, Suite D2, in Founder&apos;s
            Square in downtown Solvang. It is a listening lounge first: vinyl
            through a high-fidelity system, not background playlists. Thursday
            through Saturday we are open 4pm to 10pm, later than most of Mission
            Drive. Sunday and Monday we close at 8pm. Closed Tuesday and
            Wednesday. Walk in. No cover unless a night on the calendar says
            otherwise.
          </p>
          <p>
            The bar pours Santa Barbara County wine, craft beer, and zero-proof
            drinks by the glass. Pair a pour with Side Hustle Pizza focaccia pizza
            and simple salads: a 6&quot; × 8&quot; to split, or a 12&quot; × 8&quot;
            for a group. See the{" "}
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
          <p>
            Guest DJ nights, listening parties, and weekly gatherings all use this
            same room: shelves of vinyl, a booth, warm light, and a bar built for
            staying a while after dinner or a tasting in the Santa Ynez Valley.
            If this date has passed, the page stays live so you can see what a
            night here looks like and find the next one on the calendar.
          </p>
        </div>
      </section>

      {relatedEvents.length > 0 ? (
        <section className="mt-12 border-t border-coal/10 pt-10 text-left">
          <h2 className="font-display mb-3 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal">
            More nights
          </h2>
          <ul className="font-body space-y-2 text-[15px] leading-relaxed text-coal/85">
            {relatedEvents.map((related) => {
              const relatedSlug = related.slug?.current?.trim()
              if (!relatedSlug) return null
              return (
                <li key={related._id || relatedSlug}>
                  <Link href={eventPath(relatedSlug)} className={EVENT_SEO_LINK}>
                    {related.title?.trim() || "Event"}
                  </Link>
                  <span className="text-coal/60">
                    {" "}
                    · {formatEventDateShort(related.date)}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
