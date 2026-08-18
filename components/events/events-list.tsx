import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
import { EventBody } from "@/components/events/event-body"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import type { Event } from "@/lib/sanity/types"
import { parseCalendarDate } from "@/lib/utils"

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="border border-coal/12 bg-coal/4 px-8 py-12 text-center md:py-14">
        <p className="font-label mb-4 text-[10px] uppercase tracking-[0.45em] text-orange">
          Calendar
        </p>
        <h3 className="font-display mb-4 text-2xl text-coal md:text-[28px]">
          Nothing on the calendar at the moment
        </h3>
        <div className="mx-auto mb-6 h-px w-12 bg-orange" />
        <p className="mx-auto max-w-md font-body text-[15px] leading-relaxed text-coal/80">
          Upcoming nights and specials aren&apos;t listed yet, but check back soon. We usually share new dates on{" "}
          <a
            href={DEFAULT_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-orange/50 text-orange transition-colors hover:border-orange hover:text-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Instagram
          </a>{" "}
          before they appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
      {events.map((event, index) => (
        <EventArticle key={event._id || index} event={event} priorityImage={index === 0} />
      ))}
    </div>
  )
}

function EventArticle({
  event,
  priorityImage,
}: {
  event: Event
  priorityImage?: boolean
}) {
  const date = event.date ? parseCalendarDate(event.date) : null
  const dateLine = date
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBD"
  const slug = event.slug?.current?.trim()

  return (
    <article
      id={slug || undefined}
      className="scroll-mt-28 border-t border-coal/10 pt-12 first:border-t-0 first:pt-0 sm:pt-14 md:pt-16 first:sm:pt-0 first:md:pt-0"
    >
      <header className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10">
        <p className="font-label mb-3 text-[10px] tracking-[0.4em] text-orange uppercase">
          {event.eventType || "Event"}
        </p>
        <h3 className="font-display mb-4 text-[clamp(28px,4vw,40px)] leading-[1.05] text-coal">
          {event.title || "Event Title TBD"}
        </h3>
        <div className="mx-auto mb-4 h-0.5 w-10 bg-orange" />
        <p className="font-body text-[15px] text-coal/80">
          <span className="font-label mr-2 text-[10px] tracking-[0.2em] text-orange uppercase">
            When
          </span>
          {dateLine}
          {event.time ? ` · ${event.time}` : null}
        </p>
      </header>

      <div className="mx-auto max-w-[720px]">
        <EventFeatureImage
          image={event.image}
          title={event.title}
          priority={priorityImage}
        />

        {event.description ? (
          <p className="font-body mb-6 text-[16px] leading-relaxed text-coal/88">
            {event.description}
          </p>
        ) : null}

        {event.longDescription?.length ? (
          <EventBody value={event.longDescription} />
        ) : null}

        {event.ticketUrl ? (
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
      </div>
    </article>
  )
}
