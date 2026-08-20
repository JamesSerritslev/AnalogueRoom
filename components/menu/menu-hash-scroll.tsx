"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollDrinksMenuToId } from "@/lib/menu-section-scroll"
import { DRINKS_MENU_PATH } from "@/lib/site-routes"

/**
 * When landing on the drinks menu with a hash (e.g. `#wines`, `#beer`, `#zero-proof`),
 * scroll that section into view (after layout; beer gets extra mobile offset).
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
      scrollDrinksMenuToId(id)
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
      if (id) scrollDrinksMenuToId(id)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
