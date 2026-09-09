import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { eventPath } from "@/lib/events"
import { homeEventWhenPrefix } from "@/lib/event-recurrence"
import type { Event } from "@/lib/sanity/types"

export function HomeTodayEventCta({ event }: { event: Event }) {
  const slug = event.slug?.current?.trim()
  if (!slug || !event.title?.trim() || !event.date) return null

  const when = homeEventWhenPrefix(event.date)
  const time = event.time?.trim()

  return (
    <div className="flex min-h-8 items-center justify-center gap-2 bg-orange px-3 py-1 sm:min-h-9 sm:gap-3 sm:px-6 md:px-10">
      <p className="min-w-0 truncate font-label text-[10px] tracking-[0.08em] text-cream uppercase sm:text-[11px] sm:tracking-[0.12em]">
        {when}: {event.title.trim()}
        {time ? ` · ${time}` : null}
      </p>
      <Link
        href={eventPath(slug)}
        className="inline-flex shrink-0 items-center gap-0.5 border border-cream/85 px-2.5 py-1 font-label text-[9px] leading-none tracking-[0.14em] text-cream uppercase transition-colors hover:bg-cream hover:text-orange sm:px-3 sm:text-[10px]"
      >
        See more here!
        <ChevronRight className="h-3 w-3" strokeWidth={2.25} aria-hidden />
      </Link>
    </div>
  )
}
