"use client"

import Image from "next/image"
import { useState } from "react"
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import { AboutPhotoLightbox } from "@/components/about/about-photo-lightbox"
import type { VenuePhoto } from "@/lib/venue-photos"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const ABOUT_PHOTOS = [
  VENUE_PHOTOS.storefront,
  VENUE_PHOTOS.boothWine,
  VENUE_PHOTOS.djRecords,
  VENUE_PHOTOS.blueVinyl,
  VENUE_PHOTOS.analoguePint,
  VENUE_PHOTOS.recordWall,
  VENUE_PHOTOS.teamBar,
  VENUE_PHOTOS.craftBeer,
  VENUE_PHOTOS.shelfGear,
  VENUE_PHOTOS.decksOverhead,
  VENUE_PHOTOS.barNight,
  VENUE_PHOTOS.fullBooth,
  VENUE_PHOTOS.nightCrowd,
  VENUE_PHOTOS.analogueWine,
  VENUE_PHOTOS.browsingRecords,
  VENUE_PHOTOS.pizzaBoard,
] as const

/** Desktop 2x for ~550px columns; avoid undersized Next image sources. */
const PAIR_SIZES = "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 900px"
const TRIO_SIZES = "(max-width: 640px) 100vw, (max-width: 1100px) 33vw, 640px"
const HALF_SIZES = "(max-width: 768px) 100vw, 900px"
const QUOTE_SIZES = "(max-width: 767px) 50vw, 480px"
const MOSAIC_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"

type AboutStoryProps = {
  paragraphs: readonly string[]
}

function PhotoFrame({
  photo,
  index,
  onOpen,
  sizes,
  aspectClass,
  priority = false,
}: {
  photo: VenuePhoto
  index: number
  onOpen: (index: number) => void
  sizes: string
  /** Fixed crop so paired photos share one height. */
  aspectClass: string
  priority?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative block w-full overflow-hidden ${aspectClass} cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange`}
      aria-label={`Open photo: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={88}
        className="object-cover object-center motion-safe:transition-opacity motion-safe:duration-300 group-active:opacity-90"
      />
    </button>
  )
}

/** Closing mosaic keeps native aspect (no forced crop). */
function MosaicPhoto({
  photo,
  index,
  onOpen,
}: {
  photo: VenuePhoto
  index: number
  onOpen: (index: number) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      aria-label={`Open photo: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={MOSAIC_SIZES}
        quality={88}
        className="h-auto w-full motion-safe:transition-opacity motion-safe:duration-300 group-active:opacity-90"
      />
    </button>
  )
}

/**
 * Story + photos interleaved so the About page isn’t one text block then one gallery.
 */
export function AboutStory({ paragraphs }: AboutStoryProps) {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const openAt = (index: number) => {
    setStartIndex(index)
    setOpen(true)
  }

  const p = paragraphs
  const [p0, p1, p2, p3, p4, ...rest] = p

  return (
    <>
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[920px]">
          <RevealOnScroll>
            <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              The Analogue Room
            </p>
            <h2 className="font-display mb-6 text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-coal">
              A Room Worth <em className="not-italic text-orange">Sitting In</em>
            </h2>
            <div className="mb-8 h-0.5 w-12 bg-orange" />
            {p0 ? (
              <p className="font-body mb-4 text-base leading-relaxed text-coal/85">{p0}</p>
            ) : null}
            {p1 ? (
              <p className="font-body text-base leading-relaxed text-coal/85">{p1}</p>
            ) : null}
          </RevealOnScroll>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
          <RevealOnScroll delay={40}>
            <PhotoFrame
              photo={ABOUT_PHOTOS[0]}
              index={0}
              onOpen={openAt}
              sizes={PAIR_SIZES}
              aspectClass="aspect-[4/3]"
              priority
            />
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <PhotoFrame
              photo={ABOUT_PHOTOS[1]}
              index={1}
              onOpen={openAt}
              sizes={PAIR_SIZES}
              aspectClass="aspect-[4/3]"
              priority
            />
          </RevealOnScroll>
        </div>
      </section>

      {(p2 || p3) && (
        <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[920px]">
            <RevealOnScroll>
              {p2 ? (
                <p className="font-body mb-4 text-base leading-relaxed text-coal/85">{p2}</p>
              ) : null}
              {p3 ? (
                <p className="font-body text-base leading-relaxed text-coal/85">{p3}</p>
              ) : null}
            </RevealOnScroll>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4">
            {[2, 3, 4].map((i, delayIdx) => (
              <RevealOnScroll key={ABOUT_PHOTOS[i].src} delay={delayIdx * 60}>
                <PhotoFrame
                  photo={ABOUT_PHOTOS[i]}
                  index={i}
                  onOpen={openAt}
                  sizes={TRIO_SIZES}
                  aspectClass="aspect-[3/4]"
                />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_minmax(0,1.15fr)_1fr] md:gap-6 lg:gap-8">
          <RevealOnScroll className="hidden md:block" delay={40}>
            <PhotoFrame
              photo={ABOUT_PHOTOS[5]}
              index={5}
              onOpen={openAt}
              sizes={QUOTE_SIZES}
              aspectClass="aspect-[3/4]"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <blockquote className="border-t-2 border-b-2 border-coal py-8 text-center font-display text-[clamp(22px,3vw,30px)] leading-snug text-orange md:py-10">
              &ldquo;Curation. Intention. Analogue.&rdquo;
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll className="hidden md:block" delay={80}>
            <PhotoFrame
              photo={ABOUT_PHOTOS[6]}
              index={6}
              onOpen={openAt}
              sizes={QUOTE_SIZES}
              aspectClass="aspect-[3/4]"
            />
          </RevealOnScroll>
        </div>
        <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 gap-3 md:hidden">
          <PhotoFrame
            photo={ABOUT_PHOTOS[5]}
            index={5}
            onOpen={openAt}
            sizes={QUOTE_SIZES}
            aspectClass="aspect-[3/4]"
          />
          <PhotoFrame
            photo={ABOUT_PHOTOS[6]}
            index={6}
            onOpen={openAt}
            sizes={QUOTE_SIZES}
            aspectClass="aspect-[3/4]"
          />
        </div>
      </section>

      {(p4 || rest.length > 0) && (
        <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-14">
            <RevealOnScroll>
              <PhotoFrame
                photo={ABOUT_PHOTOS[7]}
                index={7}
                onOpen={openAt}
                sizes={HALF_SIZES}
                aspectClass="aspect-[4/3]"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <div className="font-body text-base leading-relaxed text-coal/85">
                {p4 ? <p className={rest.length ? "mb-4" : ""}>{p4}</p> : null}
                {rest.map((text, i) => (
                  <p key={`story-rest-${i}`} className={i < rest.length - 1 ? "mb-4" : ""}>
                    {text}
                  </p>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
            <RevealOnScroll>
              <PhotoFrame
                photo={ABOUT_PHOTOS[8]}
                index={8}
                onOpen={openAt}
                sizes={PAIR_SIZES}
                aspectClass="aspect-[4/3]"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <PhotoFrame
                photo={ABOUT_PHOTOS[9]}
                index={9}
                onOpen={openAt}
                sizes={PAIR_SIZES}
                aspectClass="aspect-[4/3]"
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      <section className="bg-cream px-3 pb-20 sm:px-5 sm:pb-24 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1100px] columns-1 gap-3 sm:columns-2 sm:gap-3.5 md:columns-3 md:gap-4">
          {ABOUT_PHOTOS.slice(10).map((shot, i) => {
            const index = i + 10
            return (
              <RevealOnScroll
                key={shot.src}
                delay={Math.min(i * 40, 240)}
                className="mb-3 break-inside-avoid sm:mb-3.5 md:mb-4"
              >
                <MosaicPhoto photo={shot} index={index} onOpen={openAt} />
              </RevealOnScroll>
            )
          })}
        </div>
      </section>

      <AboutPhotoLightbox
        key={startIndex}
        photos={ABOUT_PHOTOS}
        open={open}
        startIndex={startIndex}
        onOpenChange={setOpen}
      />
    </>
  )
}
