import Link from "next/link"
import { EventBody } from "@/components/events/event-body"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import { formatEventDate, visibleEventType } from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import type { Event } from "@/lib/sanity/types"

export function EventDetail({ event }: { event: Event }) {
  const dateLine = formatEventDate(event.date)
  const eventType = visibleEventType(event.eventType)

  return (
    <article className="mx-auto max-w-[720px] px-4 pb-12 pt-page-hero sm:px-6 sm:pb-14 md:px-10 md:pb-16 lg:px-12">
      <RevealOnScroll eager>
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
            {event.title || "Event Title TBD"}
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
        </header>
      </RevealOnScroll>

      <RevealOnScroll eager delay={80}>
        <EventFeatureImage image={event.image} title={event.title} priority />
      </RevealOnScroll>

      {event.description ? (
        <RevealOnScroll>
          <p className="font-body mb-6 text-[16px] leading-relaxed text-coal/88">
            {event.description}
          </p>
        </RevealOnScroll>
      ) : null}

      {event.longDescription?.length ? (
        <RevealOnScroll>
          <EventBody value={event.longDescription} />
        </RevealOnScroll>
      ) : null}

      {event.ticketUrl ? (
        <RevealOnScroll>
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
        </RevealOnScroll>
      ) : null}
    </article>
  )
}
