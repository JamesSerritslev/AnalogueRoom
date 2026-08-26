type GtagFn = (
  command: "event" | "config" | "js" | "set",
  ...args: unknown[]
) => void

declare global {
  interface Window {
    gtag?: GtagFn
    dataLayer?: unknown[]
  }
}

export type MapsProvider = "apple" | "google"

/** Fire a GA4 event when gtag is available (no-op if blocked / not loaded). */
function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return
  if (typeof window.gtag !== "function") return
  window.gtag("event", name, params)
}

/** Directions / maps handoff (Apple or Google). */
export function trackOpenInMaps(
  placement: string,
  provider: MapsProvider = "apple",
): void {
  trackEvent("open_in_maps", {
    placement,
    map_provider: provider,
    link_url: provider === "google" ? "google_maps" : "apple_maps",
  })
}

/** Tap-to-call (`tel:`) links. */
export function trackTapToCall(placement: string): void {
  trackEvent("tap_to_call", { placement })
}

/** Outbound Instagram profile clicks. */
export function trackInstagramClick(placement: string): void {
  trackEvent("instagram_click", {
    placement,
    link_url: "instagram",
    outbound: true,
  })
}

/** Outbound Facebook profile clicks. */
export function trackFacebookClick(placement: string): void {
  trackEvent("facebook_click", {
    placement,
    link_url: "facebook",
    outbound: true,
  })
}

/** Outbound Yelp listing clicks. */
export function trackYelpClick(placement: string): void {
  trackEvent("yelp_click", {
    placement,
    link_url: "yelp",
    outbound: true,
  })
}

/** Outbound Google reviews / listing clicks. */
export function trackGoogleReviewsClick(placement: string): void {
  trackEvent("google_reviews_click", {
    placement,
    link_url: "google_reviews",
    outbound: true,
  })
}

/** Successful newsletter subscribe. */
export function trackNewsletterSignup(placement = "footer"): void {
  trackEvent("newsletter_signup", { placement })
}

/** Successful Host Your Event inquiry. */
export function trackHostEventSubmit(): void {
  trackEvent("generate_lead", {
    lead_type: "host_event",
    placement: "host_event_form",
  })
  trackEvent("host_event_submit", { placement: "host_event_form" })
}
