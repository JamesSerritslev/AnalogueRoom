"use client"

import dynamic from "next/dynamic"
import { LazyWhenVisible } from "@/components/lazy-when-visible"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"

const VenueMap = dynamic(() => import("@/components/VenueMap"), {
  ssr: false,
})

const mapPlaceholder = (
  <div
    className="h-[min(52vw,420px)] w-full bg-coal/5 motion-safe:animate-pulse sm:h-[380px] md:h-[420px]"
    aria-hidden
  />
)

export function VisitSectionMap() {
  return (
    <div className="mx-auto mt-12 w-full min-w-0 max-w-[1100px] sm:mt-14 md:mt-16">
      <div className="overflow-hidden rounded-sm border-2 border-coal/10">
        <LazyWhenVisible placeholder={mapPlaceholder}>
          <VenueMap />
        </LazyWhenVisible>
      </div>
      <div className="mt-6 flex justify-center sm:mt-7">
        <a
          href={VENUE_APPLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label inline-flex min-h-11 items-center justify-center border border-coal/25 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-coal transition-colors hover:border-orange hover:text-orange motion-safe:duration-300 sm:tracking-[0.28em]"
        >
          Open in Maps
        </a>
      </div>
    </div>
  )
}
