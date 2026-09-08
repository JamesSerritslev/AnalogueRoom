import Image from "next/image"
import Link from "next/link"
import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
import { EventFeatureImage } from "@/components/events/event-feature-image"
import { RevealImage } from "@/components/shared/reveal-image"
import { TrackedInstagramLink } from "@/components/shared/tracked-links"
import { eventPath, formatEventDate, formatEventDateShort } from "@/lib/events"
import { formatEveryWeekday } from "@/lib/event-recurrence"
import { sanityCroppedImageUrl } from "@/lib/sanity/image-url"
import type { Event, SanityImageField } from "@/lib/sanity/types"

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
    )
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
      {events.map((event, index) => (
        <EventTeaser key={event._id || index} event={event} priorityImage={index === 0} />
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

        {event.description ? (
          <p className="mx-auto mb-6 max-w-[560px] font-body text-[16px] leading-relaxed text-coal/88">
            {event.description}
          </p>
        ) : null}

        {slug ? (
          <Link
            href={eventPath(slug)}
            className="inline-flex min-h-11 items-center justify-center bg-coal px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-orange"
          >
            See more info
          </Link>
        ) : null}
      </div>
    </article>
  )
}

function pastEventImageSrc(image: SanityImageField | undefined): string | undefined {
  if (!image?.asset) return undefined
  const assetId = image.asset._ref || image.asset._id
  const forBuilder: SanityImageField = assetId
    ? { ...image, asset: { ...image.asset, _ref: assetId } }
    : image
  return sanityCroppedImageUrl(forBuilder, 720, 960) ?? image.asset.url
}

/** Flyer collage so past nights stay internally linked for crawlers. */
export function PastEventsList({ events }: EventsListProps) {
  const tiles = events.flatMap((event) => {
    const slug = event.slug?.current?.trim()
    const src = pastEventImageSrc(event.image)
    if (!slug || !src) return []
    return [{ event, slug, src }]
  })
  const unlabeled = events.filter((event) => {
    const slug = event.slug?.current?.trim()
    return Boolean(slug && !pastEventImageSrc(event.image))
  })

  if (tiles.length === 0 && unlabeled.length === 0) return null

  return (
    <div>
      {tiles.length > 0 ? (
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:gap-2.5">
          {tiles.map(({ event, slug, src }) => {
            const title = event.title || "Past event"
            const dateLabel = formatEventDateShort(event.date)
            return (
              <li key={event._id || slug} className="min-h-0 overflow-hidden rounded-[8px]">
                <RevealImage className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] bg-coal/5">
                  <Link
                    href={eventPath(slug)}
                    className="absolute inset-0 rounded-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                    aria-label={`${title}, ${dateLabel}`}
                  >
                    <Image
                      src={src}
                      alt={`${title} flyer, ${dateLabel}`}
                      width={720}
                      height={960}
                      sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 320px"
                      className="absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-500 hover:scale-[1.04]"
                    />
                  </Link>
                </RevealImage>
              </li>
            )
          })}
        </ul>
      ) : null}
      {unlabeled.length > 0 ? (
        <ul className="sr-only">
          {unlabeled.map((event) => {
            const slug = event.slug?.current?.trim()
            if (!slug) return null
            return (
              <li key={event._id || slug}>
                <Link href={eventPath(slug)}>
                  {event.title || "Past event"} · {formatEventDateShort(event.date)}
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
