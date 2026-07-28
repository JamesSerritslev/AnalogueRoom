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

/** Fire a GA4 event when gtag is available (no-op if blocked / not loaded). */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return
  if (typeof window.gtag !== "function") return
  window.gtag("event", name, params)
}

/** Strongest on-site proxy for “likely to show up” — directions / maps handoff. */
export function trackOpenInMaps(placement: string): void {
  trackEvent("open_in_maps", {
    placement,
    link_url: "apple_maps",
  })
}
