"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { MENU_SLUGS, type MenuSlug } from "@/lib/menu-defaults"

function isMenuHash(id: string): id is MenuSlug {
  return (MENU_SLUGS as readonly string[]).includes(id)
}

function scrollToId(id: string) {
  if (!isMenuHash(id)) return
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

/**
 * When landing on `/menu` with `#wines` | `#beer` | `#zero-proof`, scroll that
 * section into view (after layout; works with fixed nav via `scroll-mt-*` on targets).
 */
export function MenuHashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/menu") return
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
    if (pathname !== "/menu") return
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "")
      if (id) scrollToId(id)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return null
}
