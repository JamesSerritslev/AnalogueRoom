import { CoverPhotoImg } from "@/components/shared/venue-photo-img"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

/**
 * Events hero: recent portrait on mobile; recent landscape bar on desktop
 * so the wide viewport does not overcrop a vertical frame.
 */
export function VenueHeroCollage() {
  const mobile = VENUE_PHOTOS.barPatrons
  const desktop = VENUE_PHOTOS.barCrowd

  return (
    <div className="absolute inset-0 z-0">
      <CoverPhotoImg
        photo={mobile}
        priority
        sizes="100vw"
        className="object-[center_28%] md:hidden"
      />
      <CoverPhotoImg
        photo={desktop}
        priority
        sizes="100vw"
        className="hidden object-[center_40%] md:block"
      />
      <div className="interior-hero-scrim" aria-hidden />
    </div>
  )
}
