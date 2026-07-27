"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollToAnchorById } from "@/lib/anchor-scroll"

const OFFERINGS_ID = "offerings"

function tryScrollToOfferings(): void {
  if (typeof window === "undefined") return
  if (window.location.hash.replace(/^#/, "") !== OFFERINGS_ID) return
  // Match mobile drink icon: sit a bit further into the section.
  scrollToAnchorById(OFFERINGS_ID, { extraOffsetPx: -140 })
}

/**
 * After navigating to `/#offerings` (e.g. from mobile nav drink icon),
 * scroll the drinks/food section into view.
 */
export function OfferingsHashScroll() {
  const pathname = usePathname() ?? ""

  useEffect(() => {
    if (pathname !== "/") return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      tryScrollToOfferings()
    }

    run()
    const t1 = window.setTimeout(run, 80)
    const t2 = window.setTimeout(run, 220)
    const t3 = window.setTimeout(run, 450)
    const t4 = window.setTimeout(run, 780)
    const rafOuter = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run)
    })

    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
      window.cancelAnimationFrame(rafOuter)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/") return
    const onHash = () => tryScrollToOfferings()
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
