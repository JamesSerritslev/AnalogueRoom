import {
  DEFAULT_ROOM_BODY,
  DEFAULT_ROOM_EYEBROW,
  DEFAULT_ROOM_HEADLINE,
} from "@/lib/content-defaults"
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import { VenuePhotoImg } from "@/components/shared/venue-photo-img"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/components/shared/render-headline-accent"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const ROOM_STRIP = [
  VENUE_PHOTOS.boothWine,
  VENUE_PHOTOS.analogueWine,
] as const

export async function RoomSection() {
  const L = await getLayoutSingletons()

  const eyebrow = L.home?.roomEyebrow || DEFAULT_ROOM_EYEBROW
  const headline = L.home?.roomHeadline || DEFAULT_ROOM_HEADLINE
  const bodyParagraphs =
    L.home?.roomBody?.filter((p) => p?.trim())?.length
      ? L.home.roomBody
      : DEFAULT_ROOM_BODY

  return (
    <section id="room" className="relative z-2 scroll-mt-20 bg-cream px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-16">
        <RevealOnScroll>
          <div>
            <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
              {eyebrow}
            </p>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] text-coal leading-[1.05] mb-6">
              {renderHeadlineAccent(headline, HOME_HEADLINE_ACCENTS.room)}
            </h2>
            <div className="w-12 h-0.5 bg-orange mb-6" />
            {bodyParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={`font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px]${idx < bodyParagraphs.length - 1 ? " mb-6" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={140} className="w-full">
          <VenuePhotoImg
            photo={VENUE_PHOTOS.recordWall}
            sizes="(max-width: 767px) 100vw, 520px"
            className="h-auto w-full"
            priority
          />
        </RevealOnScroll>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1100px] flex-col gap-3 sm:mt-10 sm:gap-4 md:mt-14 md:grid md:grid-cols-2 md:gap-4">
        {ROOM_STRIP.map((photo, idx) => (
          <RevealOnScroll key={photo.src} delay={idx * 70} className="w-full">
            <VenuePhotoImg
              photo={photo}
              sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 540px"
              className="h-auto w-full"
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
