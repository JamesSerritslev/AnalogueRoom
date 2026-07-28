"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { DRINKS_MENU_PATH } from "@/lib/site-routes"

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

/**
 * When landing on the drinks menu with a hash (e.g. `#wines`, `#beer`, `#zero-proof`),
 * scroll that section into view (after layout; works with fixed nav via `scroll-mt-*`).
 */
export function MenuHashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== DRINKS_MENU_PATH) return
    const id = window.location.hash.replace(/^#/, "")
    if (!id) return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      scrollToId(id)
    }

    requestAnimationFrame(() => requestAnimationFrame(run))
    const t1 = window.setTimeout(run, 120)
    const t2 = window.setTimeout(run, 400)

    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== DRINKS_MENU_PATH) return
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "")
      if (id) scrollToId(id)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
