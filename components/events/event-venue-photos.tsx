"use client"

import Image from "next/image"
import { useState } from "react"
import { AboutPhotoLightbox } from "@/components/about/about-photo-lightbox"
import { RevealImage } from "@/components/shared/reveal-image"
import { VENUE_PHOTOS, type VenuePhoto } from "@/lib/venue-photos"

const EVENT_VENUE_PHOTOS = [
  VENUE_PHOTOS.blueVinyl,
  VENUE_PHOTOS.djRecords,
  VENUE_PHOTOS.nightCrowd,
  VENUE_PHOTOS.decksOverhead,
] as const

const PHOTO_ASPECT = [
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/3]",
] as const

const PHOTO_SIZES = "(max-width: 640px) 50vw, (max-width: 1100px) 50vw, 500px"

function PhotoTile({
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
        className={`group relative block w-full overflow-hidden ${PHOTO_ASPECT[index]} cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange`}
        aria-label={`Open photo: ${photo.alt}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={PHOTO_SIZES}
          quality={88}
          className="object-cover object-center motion-safe:transition-opacity motion-safe:duration-300 group-active:opacity-90"
        />
      </button>
    </RevealImage>
  )
}

/** Venue photos shown on every individual event page. */
export function EventVenuePhotos() {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const openAt = (index: number) => {
    setStartIndex(index)
    setOpen(true)
  }

  return (
    <section
      className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-10 md:pb-28 lg:px-12"
      aria-label="The Analogue Room"
    >
      <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {EVENT_VENUE_PHOTOS.map((photo, index) => (
          <PhotoTile key={photo.src} photo={photo} index={index} onOpen={openAt} />
        ))}
      </div>
      <AboutPhotoLightbox
        key={startIndex}
        photos={EVENT_VENUE_PHOTOS}
        open={open}
        startIndex={startIndex}
        onOpenChange={setOpen}
      />
    </section>
  )
}
