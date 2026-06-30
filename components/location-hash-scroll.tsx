"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollToAnchorById } from "@/lib/anchor-scroll"

const LOCATION_ID = "location"

function tryScrollToLocation(): void {
  if (typeof window === "undefined") return
  if (window.location.hash.replace(/^#/, "") !== LOCATION_ID) return
  scrollToAnchorById(LOCATION_ID)
}

/**
 * After navigating to `/#location` (e.g. from nav “Find Us”), scroll the map
 * into view — Next client nav often skips hash scrolling.
 */
export function LocationHashScroll() {
  const pathname = usePathname() ?? ""

  useEffect(() => {
    if (pathname !== "/") return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      tryScrollToLocation()
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
    const onHash = () => tryScrollToLocation()
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
