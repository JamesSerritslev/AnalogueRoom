"use client"

import Image from "next/image"
import { useState } from "react"
import { AboutPhotoLightbox } from "@/components/about/about-photo-lightbox"
import { RevealImage } from "@/components/shared/reveal-image"
import { CoverPhotoImg } from "@/components/shared/venue-photo-img"
import {
  renderBodyAccents,
  type BodyAccentLink,
} from "@/components/shared/render-headline-accent"
import { TrackedDirectionsLink, TrackedFacebookLink, TrackedInstagramLink } from "@/components/shared/tracked-links"
import { FacebookIcon } from "@/components/icons/facebook-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"
import { DEFAULT_FACEBOOK_URL, DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"
import type { VenuePhoto } from "@/lib/venue-photos"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const LOCATION_LINK_CLASS =
  "not-italic text-orange underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"

const ABOUT_LOCATION_LINKS: readonly BodyAccentLink[] = [
  {
    phrase: "1693 Mission Drive, Suite D2",
    render: (phrase) => (
      <TrackedDirectionsLink
        placement="about_address"
        className={LOCATION_LINK_CLASS}
      >
        {phrase}
      </TrackedDirectionsLink>
    ),
  },
  {
    phrase: "Founder's Square",
    render: (phrase) => (
      <TrackedDirectionsLink
        placement="about_founders_square"
        className={LOCATION_LINK_CLASS}
      >
        {phrase}
      </TrackedDirectionsLink>
    ),
  },
  {
    phrase: "downtown Solvang",
    render: (phrase) => (
      <TrackedDirectionsLink
        placement="about_downtown_solvang"
        className={LOCATION_LINK_CLASS}
      >
        {phrase}
      </TrackedDirectionsLink>
    ),
  },
]

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
  /** Orange phrases per paragraph index (crawlable text; CSS color only). */
  accents?: readonly (readonly string[])[]
}

function StoryParagraph({
  text,
  accents,
  className,
}: {
  text: string
  accents?: readonly string[]
  className?: string
}) {
  return (
    <p className={className}>
      {renderBodyAccents(text, accents ?? [], ABOUT_LOCATION_LINKS)}
    </p>
  )
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
    <RevealImage className="w-full">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className={`group relative block w-full overflow-hidden ${aspectClass} cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange`}
        aria-label={`Open photo: ${photo.alt}`}
      >
        <CoverPhotoImg
          photo={photo}
          sizes={sizes}
          priority={priority}
          quality={88}
          className="object-center motion-safe:transition-opacity motion-safe:duration-300 group-active:opacity-90"
        />
      </button>
    </RevealImage>
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
    <RevealImage className="w-full">
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
    </RevealImage>
  )
}

/**
 * Story + photos interleaved so the About page isn’t one text block then one gallery.
 */
export function AboutStory({ paragraphs, accents = [] }: AboutStoryProps) {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const openAt = (index: number) => {
    setStartIndex(index)
    setOpen(true)
  }

  const p = paragraphs
  const [p0, p1, p2, p3, p4, ...rest] = p
  const a = (i: number) => accents[i]

  return (
    <>
      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[920px]">
          <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              Analogue Room
            </p>
            <div className="mb-6 flex items-start justify-between gap-4 sm:gap-6">
              <h2 className="font-display min-w-0 flex-1 text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-coal">
                A Room Worth <em className="not-italic text-orange">Sitting In</em>
              </h2>
              <div className="mt-1 flex shrink-0 items-center gap-2.5 sm:mt-2 sm:gap-3 lg:hidden">
                <TrackedInstagramLink
                  href={DEFAULT_INSTAGRAM_URL}
                  placement="about_story"
                  className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <InstagramIcon className="h-8 w-8 sm:h-9 sm:w-9" />
                  <span className="sr-only">Follow Analogue Room on Instagram</span>
                </TrackedInstagramLink>
                <TrackedFacebookLink
                  href={DEFAULT_FACEBOOK_URL}
                  placement="about_story"
                  className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <FacebookIcon className="h-8 w-8 sm:h-9 sm:w-9" />
                  <span className="sr-only">Follow Analogue Room on Facebook</span>
                </TrackedFacebookLink>
              </div>
            </div>
            <div className="mb-8 h-0.5 w-12 bg-orange" />
            {p0 ? (
              <StoryParagraph
                text={p0}
                accents={a(0)}
                className="font-body mb-4 text-base leading-relaxed text-coal/85"
              />
            ) : null}
            {p1 ? (
              <StoryParagraph
                text={p1}
                accents={a(1)}
                className="font-body text-base leading-relaxed text-coal/85"
              />
            ) : null}
        </div>

        <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
          <PhotoFrame
              photo={ABOUT_PHOTOS[0]}
              index={0}
              onOpen={openAt}
              sizes={PAIR_SIZES}
              aspectClass="aspect-[4/3]"
              priority
            />
          <PhotoFrame
              photo={ABOUT_PHOTOS[1]}
              index={1}
              onOpen={openAt}
              sizes={PAIR_SIZES}
              aspectClass="aspect-[4/3]"
              priority
            />
        </div>
      </section>

      {(p2 || p3) && (
        <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[920px]">
              {p2 ? (
                <StoryParagraph
                  text={p2}
                  accents={a(2)}
                  className="font-body mb-4 text-base leading-relaxed text-coal/85"
                />
              ) : null}
              {p3 ? (
                <StoryParagraph
                  text={p3}
                  accents={a(3)}
                  className="font-body text-base leading-relaxed text-coal/85"
                />
              ) : null}
          </div>

          <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4">
            {[2, 3, 4].map((i) => (
              <PhotoFrame
                key={ABOUT_PHOTOS[i].src}
                  photo={ABOUT_PHOTOS[i]}
                  index={i}
                  onOpen={openAt}
                  sizes={TRIO_SIZES}
                aspectClass="aspect-[3/4]"
              />
            ))}
          </div>
        </section>
      )}

      <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-8 md:grid-cols-[1fr_minmax(0,1.15fr)_1fr] md:gap-6 lg:gap-8">
          <div className="hidden md:block">
            <PhotoFrame
              photo={ABOUT_PHOTOS[5]}
              index={5}
              onOpen={openAt}
              sizes={QUOTE_SIZES}
              aspectClass="aspect-[3/4]"
            />
          </div>
          <blockquote className="border-t-2 border-b-2 border-coal py-8 text-center font-display text-[clamp(22px,3vw,30px)] leading-snug text-orange md:py-10">
            &ldquo;Curation. Intention. Analogue.&rdquo;
          </blockquote>
          <div className="hidden md:block">
            <PhotoFrame
              photo={ABOUT_PHOTOS[6]}
              index={6}
              onOpen={openAt}
              sizes={QUOTE_SIZES}
              aspectClass="aspect-[3/4]"
            />
          </div>
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
            <PhotoFrame
              photo={ABOUT_PHOTOS[7]}
              index={7}
              onOpen={openAt}
              sizes={HALF_SIZES}
              aspectClass="aspect-[4/3]"
            />
            <div className="font-body text-base leading-relaxed text-coal/85">
                {p4 ? (
                  <StoryParagraph
                    text={p4}
                    accents={a(4)}
                    className={rest.length ? "mb-4" : ""}
                  />
                ) : null}
                {rest.map((text, i) => (
                  <StoryParagraph
                    key={`story-rest-${i}`}
                    text={text}
                    accents={a(5 + i)}
                    className={i < rest.length - 1 ? "mb-4" : ""}
                  />
                ))}
              </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
            <PhotoFrame
                photo={ABOUT_PHOTOS[8]}
                index={8}
                onOpen={openAt}
                sizes={PAIR_SIZES}
                aspectClass="aspect-[4/3]"
            />
            <PhotoFrame
                photo={ABOUT_PHOTOS[9]}
                index={9}
                onOpen={openAt}
                sizes={PAIR_SIZES}
                aspectClass="aspect-[4/3]"
            />
          </div>
        </section>
      )}

      <section className="bg-cream px-3 pb-20 sm:px-5 sm:pb-24 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1100px] columns-1 gap-3 sm:columns-2 sm:gap-3.5 md:columns-3 md:gap-4">
          {ABOUT_PHOTOS.slice(10).map((shot, i) => {
            const index = i + 10
            return (
              <div key={shot.src} className="mb-3 break-inside-avoid sm:mb-3.5 md:mb-4">
                <MosaicPhoto photo={shot} index={index} onOpen={openAt} />
              </div>
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
