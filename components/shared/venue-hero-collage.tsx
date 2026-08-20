import Image from "next/image"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

/**
 * Events hero: portrait DJ duo on mobile; landscape booth on desktop
 * so the wide viewport does not overcrop a vertical frame.
 */
export function VenueHeroCollage() {
  const mobile = VENUE_PHOTOS.djDuo
  const desktop = VENUE_PHOTOS.fullBooth

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={mobile.src}
        alt={mobile.alt}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="object-cover object-[center_22%] md:hidden"
      />
      <Image
        src={desktop.src}
        alt={desktop.alt}
        fill
        priority
        sizes="100vw"
        quality={75}
        className="hidden object-cover object-[center_35%] md:block"
      />
      <div className="interior-hero-scrim" aria-hidden />
    </div>
  )
}
