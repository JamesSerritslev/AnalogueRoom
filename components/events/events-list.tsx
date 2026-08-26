import Link from "next/link"
import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import { TrackedInstagramLink } from "@/components/shared/tracked-links"
import { eventPath, formatEventDate } from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import type { Event } from "@/lib/sanity/types"

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <RevealOnScroll>
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
            <TrackedInstagramLink
              href={DEFAULT_INSTAGRAM_URL}
              placement="events_empty"
              className="border-b border-orange/50 text-orange transition-colors hover:border-orange hover:text-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              Instagram
            </TrackedInstagramLink>{" "}
            before they appear here.
          </p>
        </div>
      </RevealOnScroll>
    )
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
      {events.map((event, index) => (
        <RevealOnScroll key={event._id || index} delay={Math.min(index * 60, 180)}>
          <EventTeaser event={event} priorityImage={index === 0} />
        </RevealOnScroll>
      ))}
    </div>
  )
}

function EventTeaser({
  event,
  priorityImage,
}: {
  event: Event
  priorityImage?: boolean
}) {
  const slug = event.slug?.current?.trim()
  const dateLine = formatEventDate(event.date)

  return (
    <article className="border-t border-coal/10 pt-12 first:border-t-0 first:pt-0 sm:pt-14 md:pt-16 first:sm:pt-0 first:md:pt-0">
      <header className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10">
        <h3 className="font-display mb-4 text-[clamp(28px,4vw,40px)] leading-[1.05] text-coal">
          {event.title || "Event Title TBD"}
        </h3>
        <div className="mx-auto mb-4 h-0.5 w-10 bg-orange" />
        <p className="font-body text-[15px] text-coal/80">{dateLine}</p>
        {event.recurring && event.happensOn ? (
          <p className="font-label mt-2 text-[10px] tracking-[0.28em] text-orange uppercase">
            {formatEveryWeekday(event.happensOn)}
          </p>
        ) : null}
      </header>

      <div className="mx-auto max-w-[720px] text-center">
        <EventFeatureImage
          image={event.image}
          title={event.title}
          priority={priorityImage}
        />

        {slug ? (
          <Link
            href={eventPath(slug)}
            className="inline-flex min-h-11 items-center justify-center bg-orange px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
          >
            See more info
          </Link>
        ) : null}
      </div>
    </article>
  )
}
