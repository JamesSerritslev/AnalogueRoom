import type { Event } from "@/lib/sanity/types"

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  // Show placeholder events if no events from Sanity
  const displayEvents = events.length > 0 ? events : placeholderEvents

  return (
    <div className="flex flex-col gap-8">
      {displayEvents.map((event, index) => (
        <EventCard key={event._id || index} event={event} isPlaceholder={events.length === 0} />
      ))}
    </div>
  )
}

function EventCard({ event, isPlaceholder }: { event: Event; isPlaceholder?: boolean }) {
  const date = event.date ? new Date(event.date) : null
  const month = date ? date.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "TBD"
  const day = date ? date.getDate().toString() : "––"
  const time = event.time || "Time TBD"

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 md:gap-9 bg-coal/4 border-l-[3px] border-orange px-6 md:px-10 py-9 items-center transition-all duration-300 hover:bg-orange/6 hover:translate-x-1 ${
        isPlaceholder ? "opacity-55" : ""
      }`}
    >
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
      <div className="text-center md:text-right">
        {event.ticketUrl ? (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-label text-[11px] tracking-[0.3em] uppercase border border-coal text-coal px-8 py-3.5 hover:bg-coal hover:text-cream transition-colors"
          >
            Details
          </a>
        ) : (
          <span className="inline-block font-label text-[11px] tracking-[0.3em] uppercase border border-coal/30 text-coal/50 px-8 py-3.5 cursor-default">
            Details
          </span>
        )}
      </div>
    </div>
  )
}

const placeholderEvents: Event[] = [
  {
    _id: "placeholder-1",
    title: "Event Title TBD",
    eventType: "Event Type",
    date: "",
    time: "Time TBD",
    description: "Event details coming soon. Listening parties, album releases, special pours, and other curated nights will be listed here as they're scheduled.",
    ticketUrl: "",
  },
  {
    _id: "placeholder-2",
    title: "Event Title TBD",
    eventType: "Event Type",
    date: "",
    time: "Time TBD",
    description: "Event details coming soon.",
    ticketUrl: "",
  },
  {
    _id: "placeholder-3",
    title: "Event Title TBD",
    eventType: "Event Type",
    date: "",
    time: "Time TBD",
    description: "Event details coming soon.",
    ticketUrl: "",
  },
]
