"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { VenuePhotoImg } from "@/components/venue-photo-img"
import type { VenuePhoto } from "@/lib/venue-photos"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type AboutPhotoLightboxProps = {
  photos: readonly VenuePhoto[]
  open: boolean
  startIndex: number
  onOpenChange: (open: boolean) => void
}

export function AboutPhotoLightbox({
  photos,
  open,
  startIndex,
  onOpenChange,
}: AboutPhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex,
    duration: 22,
  })

  useEffect(() => {
    if (!open) return
    setIndex(startIndex)
    setShowSwipeHint(true)
    const t = window.setTimeout(() => setShowSwipeHint(false), 2800)
    return () => window.clearTimeout(t)
  }, [open, startIndex])

  useEffect(() => {
    if (!emblaApi || !open) return
    emblaApi.scrollTo(startIndex, true)
  }, [emblaApi, open, startIndex])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setIndex(emblaApi.selectedScrollSnap())
      setShowSwipeHint(false)
    }
    emblaApi.on("select", onSelect)
    emblaApi.on("pointerDown", () => setShowSwipeHint(false))
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const current = photos[index] ?? photos[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 z-[120] flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-coal/96 p-0 text-cream shadow-none sm:max-w-none"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">
          Photo gallery — {current?.alt ?? "The Analogue Room"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Swipe left or right to browse photos. Press Escape to close.
        </DialogDescription>

        <div className="flex items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-6">
          <p className="font-label text-[10px] tracking-[0.28em] text-cream/70 uppercase">
            {index + 1} / {photos.length}
          </p>
          <DialogClose
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-cream transition-colors hover:bg-cream/10 hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </DialogClose>
        </div>

        <div className="relative min-h-0 flex-1">
          <div ref={emblaRef} className="h-full overflow-hidden touch-pan-y">
            <div className="flex h-full">
              {photos.map((photo) => (
                <div
                  key={photo.src}
                  className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center px-1 sm:px-4 md:px-8"
                >
                  <VenuePhotoImg
                    photo={photo}
                    sizes="(max-width: 1100px) 100vw, 1100px"
                    className="h-auto max-h-[min(86dvh,960px)] w-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile-forward swipe hint */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-[18%] z-10 flex flex-col items-center gap-2 transition-opacity duration-500 sm:bottom-[14%] ${
              showSwipeHint && open ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          >
            <div className="about-swipe-hint flex items-center gap-2 rounded-full border border-cream/25 bg-coal/70 px-4 py-2.5 backdrop-blur-sm">
              <ChevronLeft className="h-4 w-4 text-orange" strokeWidth={2} />
              <span className="font-label text-[10px] tracking-[0.28em] text-cream uppercase">
                Swipe
              </span>
              <ChevronRight className="h-4 w-4 text-orange" strokeWidth={2} />
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 left-1 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-cream/20 bg-coal/50 text-cream backdrop-blur-sm transition-colors hover:border-orange hover:text-orange sm:inline-flex md:left-4"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 right-1 z-10 hidden min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-cream/20 bg-coal/50 text-cream backdrop-blur-sm transition-colors hover:border-orange hover:text-orange sm:inline-flex md:right-4"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mx-auto max-w-[36rem] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center font-body text-[13px] leading-snug text-cream/75 sm:px-6">
          {current?.alt}
        </p>
      </DialogContent>
    </Dialog>
  )
}
