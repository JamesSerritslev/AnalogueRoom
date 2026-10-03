export const GA_MEASUREMENT_ID = "G-Q2DC27H5DK"

export const ANALYTICS_CONSENT_KEY = "ar-analytics-consent"

export type AnalyticsConsent = "accepted" | "declined"

let gaLoadStarted = false

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)
    if (value === "accepted" || value === "declined") return value
  } catch {
    // Private mode / blocked storage
  }
  return null
}

export function setAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value)
  } catch {
    // ignore
  }
}

/**
 * Load GA4 only after explicit accept (or a prior accept).
 * Uses Google’s official dataLayer + gtag stub pattern so queued
 * config/page_view commands flush when gtag.js finishes loading.
 */
export function loadGoogleAnalytics(): void {
  if (typeof window === "undefined" || gaLoadStarted) return
  gaLoadStarted = true

  window.dataLayer = window.dataLayer || []
  // Official snippet uses `arguments` (not a rest array) for the queue.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}
