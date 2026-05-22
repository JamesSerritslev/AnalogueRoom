"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollToAnchorById } from "@/lib/anchor-scroll"

const NEWSLETTER_ID = "newsletter"

function tryScrollToNewsletter(): void {
  if (typeof window === "undefined") return
  if (window.location.hash.replace(/^#/, "") !== NEWSLETTER_ID) return
  scrollToAnchorById(NEWSLETTER_ID)
}

/**
 * After navigating to `/#newsletter` (e.g. from “Join our List”), scroll the
 * footer signup into view — Next client nav often skips hash scrolling.
 */
export function NewsletterHashScroll() {
  const pathname = usePathname() ?? ""

  useEffect(() => {
    if (pathname !== "/") return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      tryScrollToNewsletter()
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
    const onHash = () => tryScrollToNewsletter()
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
