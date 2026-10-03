"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  getAnalyticsConsent,
  loadGoogleAnalytics,
  setAnalyticsConsent,
} from "@/lib/analytics-consent"
import { PRIVACY_PATH } from "@/lib/site-routes"

/**
 * Blocks Google Analytics until the visitor accepts.
 * Choice is stored in localStorage so returning visitors aren’t asked again.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getAnalyticsConsent()
    if (consent === "accepted") {
      loadGoogleAnalytics()
      return
    }
    if (consent === "declined") return
    setVisible(true)
  }, [])

  function accept() {
    setAnalyticsConsent("accepted")
    loadGoogleAnalytics()
    setVisible(false)
  }

  function decline() {
    setAnalyticsConsent("declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie and analytics consent"
      className="fixed z-[120] max-w-[26rem] border border-coal/12 bg-cream/95 p-4 shadow-lg shadow-coal/20 backdrop-blur-md left-4 right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-auto sm:p-5"
    >
      <p className="font-body text-[13px] leading-relaxed text-coal/90">
        We use cookies for Google Analytics to understand how people use this
        site. See our{" "}
        <Link
          href={PRIVACY_PATH}
          className="text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={accept}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-coal px-4 font-label text-[11px] tracking-[0.18em] text-cream uppercase transition-colors hover:bg-orange"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={decline}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-coal/25 px-4 font-label text-[11px] tracking-[0.18em] text-coal uppercase transition-colors hover:border-coal hover:bg-coal/5"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
