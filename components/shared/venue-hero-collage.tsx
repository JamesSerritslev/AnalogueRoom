import { CoverPhotoImg } from "@/components/shared/venue-photo-img"
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
      <CoverPhotoImg
        photo={mobile}
        priority
        sizes="100vw"
        className="object-[center_22%] md:hidden"
      />
      <CoverPhotoImg
        photo={desktop}
        priority
        sizes="100vw"
        className="hidden object-[center_35%] md:block"
      />
      <div className="interior-hero-scrim" aria-hidden />
    </div>
  )
}
