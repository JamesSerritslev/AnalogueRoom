"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"
import { HOME_MENU_SECTION_HASH, HOME_SCROLL_STORAGE_KEY } from "@/lib/menu-scroll-storage"

/**
 * On `/`: if URL has `#offerings` (from menu “Back to home”), scroll to that section
 * and skip pixel-based restore. Otherwise restore scroll saved when opening a menu from home.
 */
export function HomeScrollRestore() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (pathname !== "/") return

    const hash = typeof window !== "undefined" ? window.location.hash : ""
    if (hash === HOME_MENU_SECTION_HASH) {
      sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)
      const el = document.getElementById("offerings")
      if (el) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Stop scrolling a bit before the section's natural top so the
            // previous (cream) section peeks in above it.
            const docTop = el.getBoundingClientRect().top + window.scrollY
            const scrollMargin =
              Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
            const PEEK_PX = -50
            const top = Math.max(0, docTop - scrollMargin - PEEK_PX)
            window.scrollTo({ top, left: 0, behavior: "smooth" })
          })
        })
      }
      if (typeof window !== "undefined" && window.history.replaceState) {
        window.history.replaceState(null, "", "/")
      }
      return
    }

    const raw = sessionStorage.getItem(HOME_SCROLL_STORAGE_KEY)
    if (raw == null) return
    sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)
    const y = Math.max(0, Number.parseInt(raw, 10) || 0)
    window.scrollTo(0, y)
  }, [pathname])

  return null
}
