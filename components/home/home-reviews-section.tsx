import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { VenuePhotoImg } from "@/components/venue-photo-img"
import { getVenueGoogleReviewsUrl, VENUE_NAME } from "@/lib/venue-location"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

/**
 * Homepage Google reviews strip for GBP consistency.
 * Links out to Google reviews (no map embed — the visit section already has the map).
 */
export function HomeReviewsSection() {
  const reviewsUrl = getVenueGoogleReviewsUrl()

  return (
    <section
      id="reviews"
      className="relative z-2 scroll-mt-20 bg-cream px-4 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-20 md:px-10 md:pt-12 md:pb-24 lg:px-12"
    >
      <RevealOnScroll className="mx-auto max-w-[720px] text-center" eager>
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          From Guests
        </p>
        <h2 className="font-display mb-6 text-[clamp(32px,4.5vw,48px)] leading-[1.05] text-coal">
          Reviews on <em className="not-italic text-orange">Google</em>
        </h2>
        <div className="mx-auto mb-8 h-0.5 w-12 bg-orange" />
        <p className="font-body mx-auto mb-10 max-w-[540px] text-[15px] leading-relaxed text-coal/80">
          What people say about {VENUE_NAME} in Solvang.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={60} className="mx-auto mb-8 w-full max-w-[920px] sm:mb-10">
        <VenuePhotoImg
          photo={VENUE_PHOTOS.nightCrowd}
          sizes="(max-width: 1100px) 100vw, 920px"
          className="h-auto w-full"
        />
      </RevealOnScroll>

      <RevealOnScroll
        delay={80}
        className="mx-auto mb-8 max-w-[480px] pb-4 text-center sm:mb-10 sm:pb-6"
      >
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label inline-flex min-h-11 items-center justify-center bg-orange px-6 py-3 text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
        >
          Read reviews on Google
        </a>
      </RevealOnScroll>
    </section>
  )
}
