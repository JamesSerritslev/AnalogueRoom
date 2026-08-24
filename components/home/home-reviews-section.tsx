import { ExternalLink } from "lucide-react"
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import {
  TrackedGoogleReviewsLink,
  TrackedYelpLink,
} from "@/components/shared/tracked-links"
import { GoogleReviewsIcon } from "@/components/icons/google-reviews-icon"
import { YelpIcon } from "@/components/icons/yelp-icon"
import { getGooglePlaceReviews } from "@/lib/google-place-reviews"
import { DEFAULT_YELP_URL } from "@/lib/content-defaults"
import { getVenueGoogleReviewsUrl, VENUE_NAME } from "@/lib/venue-location"

function StarRow({ rating, className = "" }: { rating: number; className?: string }) {
  const filled = Math.round(Math.min(5, Math.max(0, rating)))
  return (
    <span
      className={`inline-flex gap-0.5 text-orange ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden className={i < filled ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  )
}

/**
 * Homepage Google reviews — live Place Details when GOOGLE_PLACES_API_KEY is set,
 * otherwise heading + link-out CTA. Yelp icon links to the Yelp listing.
 */
export async function HomeReviewsSection() {
  const reviewsUrl = getVenueGoogleReviewsUrl()
  const data = await getGooglePlaceReviews()
  const hasReviews = Boolean(data?.reviews.length)

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
        {hasReviews && data ? (
          <div className="mb-10 flex flex-col items-center gap-2">
            {data.rating != null ? (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <StarRow rating={data.rating} className="text-lg" />
                <p className="font-display text-xl text-coal tabular-nums">
                  {data.rating.toFixed(1)}
                </p>
              </div>
            ) : null}
            <p className="font-body text-[15px] text-coal/70">
              {data.userRatingCount != null
                ? `${data.userRatingCount} Google review${data.userRatingCount === 1 ? "" : "s"}`
                : `What people say about ${VENUE_NAME} in Solvang.`}
            </p>
          </div>
        ) : (
          <p className="font-body mx-auto mb-10 max-w-[540px] text-[15px] leading-relaxed text-coal/80">
            What people say about {VENUE_NAME} in Solvang.
          </p>
        )}
      </RevealOnScroll>

      {hasReviews && data ? (
        <div className="mx-auto flex max-w-[720px] flex-col gap-10 sm:gap-12">
          {data.reviews.map((review, idx) => (
            <RevealOnScroll key={`${review.authorName}-${idx}`} delay={40 + idx * 40}>
              <blockquote className="border-t border-coal/10 pt-8 text-center sm:pt-10">
                <StarRow rating={review.rating} className="mb-4 text-sm" />
                <p className="font-display text-[clamp(20px,2.8vw,26px)] leading-snug text-coal">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-5 font-body text-[14px] text-coal/65">
                  {review.authorUri ? (
                    <a
                      href={review.authorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coal/80 transition-colors hover:text-orange"
                    >
                      {review.authorName}
                    </a>
                  ) : (
                    <span>{review.authorName}</span>
                  )}
                  {review.relativeTime ? (
                    <>
                      <span aria-hidden className="mx-2 text-coal/30">
                        ·
                      </span>
                      <span>{review.relativeTime}</span>
                    </>
                  ) : null}
                  <span aria-hidden className="mx-2 text-coal/30">
                    ·
                  </span>
                  <span>Google</span>
                </footer>
              </blockquote>
            </RevealOnScroll>
          ))}
        </div>
      ) : null}

      <RevealOnScroll
        delay={80}
        className="mx-auto mt-10 flex max-w-[480px] flex-col items-center pb-4 text-center sm:mt-12 sm:pb-6"
      >
        <div className="flex items-center justify-center gap-5 sm:gap-6">
          <TrackedGoogleReviewsLink
            href={reviewsUrl}
            placement="home_reviews"
            className="relative inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <GoogleReviewsIcon className="h-14 w-14 sm:h-16 sm:w-16" />
            <ExternalLink
              className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-sm bg-cream text-coal/55 shadow-sm sm:h-4 sm:w-4"
              strokeWidth={2}
              aria-hidden
            />
            <span className="sr-only">Leave a review on Google (opens in a new tab)</span>
          </TrackedGoogleReviewsLink>
          <TrackedYelpLink
            href={DEFAULT_YELP_URL}
            placement="home_reviews"
            className="relative inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <YelpIcon className="h-12 w-12 sm:h-14 sm:w-14" />
            <ExternalLink
              className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-sm bg-cream text-coal/55 shadow-sm sm:h-4 sm:w-4"
              strokeWidth={2}
              aria-hidden
            />
            <span className="sr-only">Leave a review on Yelp (opens in a new tab)</span>
          </TrackedYelpLink>
        </div>
        <p className="mt-5 font-body text-[14px] text-coal/70 sm:text-[15px]">
          Leave us a review on Google or Yelp!
        </p>
      </RevealOnScroll>
    </section>
  )
}
