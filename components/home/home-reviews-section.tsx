import { RevealOnScroll } from "@/components/reveal-on-scroll"
import {
  getGooglePlaceId,
  getVenueGoogleReviewsUrl,
  VENUE_NAME,
} from "@/lib/venue-location"

/**
 * Homepage Google reviews strip for GBP consistency.
 * When Place ID is set, shows Google's local reviews iframe; otherwise a CTA to GBP reviews.
 */
export function HomeReviewsSection() {
  const placeId = getGooglePlaceId()
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

      {placeId ? (
        <RevealOnScroll delay={80} className="mx-auto w-full max-w-[1100px]">
          <div className="overflow-hidden rounded-sm border-2 border-coal/10 bg-white">
            <iframe
              title={`${VENUE_NAME} Google reviews`}
              src={`https://www.google.com/maps?q=place_id:${encodeURIComponent(placeId)}&output=embed`}
              className="h-[min(70vw,480px)] w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-6 mb-8 flex justify-center pb-4 sm:mb-10 sm:pb-6">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-flex min-h-11 items-center justify-center border border-coal/25 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-coal transition-colors hover:border-orange hover:text-orange"
            >
              Read all reviews on Google
            </a>
          </div>
        </RevealOnScroll>
      ) : (
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
      )}
    </section>
  )
}
