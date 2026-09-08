"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"
import { HOME_MENU_SECTION_HASH, HOME_MENU_SCROLL_TARGET_ID, HOME_SCROLL_STORAGE_KEY } from "@/lib/menu-scroll-storage"
import { smoothScrollToY } from "@/lib/smooth-scroll"

/**
 * On `/`: if URL has `#offerings-intro` (from menu “Back to home”), smooth-scroll
 * to the offerings eyebrow and clear the hash. Otherwise restore pixel scroll after menu.
 */
export function HomeScrollRestore() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (pathname !== "/") return

    const hash = typeof window !== "undefined" ? window.location.hash : ""
    if (hash === HOME_MENU_SECTION_HASH) {
      sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)
      const el = document.getElementById(HOME_MENU_SCROLL_TARGET_ID)
      if (el) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const docTop = el.getBoundingClientRect().top + window.scrollY
            const scrollMargin =
              Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
            /** Small offset below nav clearance (scroll-mt handled via scrollMargin). */
            const top = Math.max(0, docTop - scrollMargin)
            smoothScrollToY(top, "smooth")
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
    smoothScrollToY(y, "auto")
  }, [pathname])

  return null
}
