import Link from "next/link"
import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
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
          Upcoming nights and specials aren&apos;t listed yet—check back soon. We usually share new dates on{" "}
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
    <div className="flex flex-col gap-8">
      {events.map((event, index) => (
        <EventCard key={event._id || index} event={event} />
      ))}
    </div>
  )
}

function detailsButtonClasses(link: boolean) {
  return [
    "inline-flex w-full min-h-11 items-center justify-center px-6 py-3 font-label text-[11px] tracking-[0.28em] uppercase transition-colors sm:min-h-0 sm:w-auto sm:px-8 sm:py-3.5 sm:tracking-[0.3em]",
    link
      ? "border border-coal text-coal hover:bg-coal hover:text-cream cursor-pointer"
      : "border border-coal/30 text-coal/50 cursor-default",
  ].join(" ")
}

function EventCard({ event }: { event: Event }) {
  const date = event.date ? parseCalendarDate(event.date) : null
  const month = date ? date.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "TBD"
  const day = date ? date.getDate().toString() : "––"
  const time = event.time || "Time TBD"
  const slug = event.slug?.current?.trim()

  return (
    <div className="grid grid-cols-1 items-center gap-6 border-l-[3px] border-orange bg-coal/4 px-4 py-7 transition-colors duration-300 hover:bg-orange/6 sm:px-6 sm:py-8 md:grid-cols-[180px_1fr_auto] md:gap-9 md:px-10 md:py-9 md:hover:translate-x-1">
      {/* Date Block */}
      <div className="text-center md:border-r border-coal/15 md:pr-9">
        <p className="font-label text-[11px] tracking-[0.4em] uppercase text-orange mb-1.5">
          {month}
        </p>
        <p className="font-display text-5xl text-coal leading-none mb-1.5">{day}</p>
        <p className="font-body text-[11px] text-coal/60">{time}</p>
      </div>

      {/* Info */}
      <div className="text-center md:text-left">
        <p className="font-label text-[9px] tracking-[0.35em] uppercase text-orange mb-2">
          {event.eventType || "Event Type"}
        </p>
        <h3 className="font-display text-2xl text-coal leading-tight mb-2.5">
          {event.title || "Event Title TBD"}
        </h3>
        <div className="w-6 h-px bg-orange mb-3 mx-auto md:mx-0" />
        <p className="font-body text-[13px] leading-relaxed text-coal/75">
          {event.description || "Event details coming soon."}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center md:text-right md:justify-self-end">
        {slug ? (
          <Link href={`/events/${encodeURIComponent(slug)}`} className={detailsButtonClasses(true)}>
            Details
          </Link>
        ) : event.ticketUrl ? (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={detailsButtonClasses(true)}
          >
            Details
          </a>
        ) : (
          <span title="Add an event slug or ticket URL in Sanity" className={detailsButtonClasses(false)}>
            Details
          </span>
        )}
      </div>
    </div>
  )
}
