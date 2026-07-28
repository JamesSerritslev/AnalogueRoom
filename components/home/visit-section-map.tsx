import { OpenInMapsLink } from "@/components/open-in-maps-link"
import { getVenueGoogleMapsEmbedSrc } from "@/lib/venue-location"

/**
 * Homepage map for GBP consistency: official Google Maps embed (primary),
 * plus Open in Maps CTA. Mapbox VenueMap remains in the codebase for other use.
 */
export function VisitSectionMap() {
  const embedSrc = getVenueGoogleMapsEmbedSrc()

  return (
    <div
      id="location"
      className="mx-auto mt-8 w-full min-w-0 max-w-[min(100%,520px)] scroll-mt-28 sm:mt-10 sm:scroll-mt-32 lg:scroll-mt-36"
    >
      <div className="aspect-square overflow-hidden rounded-sm border-2 border-coal/10 bg-coal/5">
        <iframe
          title="The Analogue Room on Google Maps: 1693 Mission Drive, Suite D2, Solvang, CA"
          src={embedSrc}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="mt-5 flex justify-center sm:mt-6">
        <OpenInMapsLink
          placement="home_map_cta"
          className="font-label inline-flex min-h-11 items-center justify-center border border-coal/25 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-coal transition-colors hover:border-orange hover:text-orange motion-safe:duration-300 sm:tracking-[0.28em]"
        >
          Open in Maps
        </OpenInMapsLink>
      </div>
    </div>
  )
}
