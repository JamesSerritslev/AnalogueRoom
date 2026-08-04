"use client"

import { useState } from "react"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { AboutPhotoLightbox } from "@/components/about/about-photo-lightbox"
import { VenuePhotoImg } from "@/components/venue-photo-img"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

/**
 * Editorial mosaic — column masonry keeps each photo at its native aspect ratio.
 */
const ABOUT_ORDER = [
  VENUE_PHOTOS.storefront,
  VENUE_PHOTOS.djRecords,
  VENUE_PHOTOS.blueVinyl,
  VENUE_PHOTOS.boothWine,
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
  VENUE_PHOTOS.pizzaWine,
] as const

export function AboutPhotoCollage() {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  return (
    <section className="relative z-2 bg-cream px-3 py-16 sm:px-5 sm:py-20 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1200px] columns-1 gap-3 sm:columns-2 sm:gap-3.5 md:columns-3 md:gap-4">
        {ABOUT_ORDER.map((shot, i) => (
          <RevealOnScroll
            key={shot.src}
            delay={Math.min(i * 40, 280)}
            className="mb-3 break-inside-avoid sm:mb-3.5 md:mb-4"
          >
            <button
              type="button"
              onClick={() => {
                setStartIndex(i)
                setOpen(true)
              }}
              className="group relative block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              aria-label={`Open photo: ${shot.alt}`}
            >
              <VenuePhotoImg
                photo={shot}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="h-auto w-full motion-safe:transition-opacity motion-safe:duration-300 group-active:opacity-90"
                priority={i < 2}
              />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      <AboutPhotoLightbox
        key={startIndex}
        photos={ABOUT_ORDER}
        open={open}
        startIndex={startIndex}
        onOpenChange={setOpen}
      />
    </section>
  )
}
