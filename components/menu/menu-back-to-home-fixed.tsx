"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { HOME_MENU_SECTION_HASH, HOME_SCROLL_STORAGE_KEY } from "@/lib/menu-scroll-storage"

/** Sentinel element rendered at the top of the cream menu section. */
export const MENU_CREAM_SENTINEL_ID = "menu-cream-sentinel"

/**
 * Fixed under the site nav on `/menu`. Hidden until the cream menu section reaches
 * the nav line, then stays visible while scrolling. Mobile: right. md+: left.
 */
export function MenuBackToHomeFixed() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById(MENU_CREAM_SENTINEL_ID)
    if (!sentinel) return
    const nav = document.querySelector("nav") as HTMLElement | null

    let raf = 0
    const update = () => {
      raf = 0
      const sentinelTop = sentinel.getBoundingClientRect().top
      const navBottom = nav?.getBoundingClientRect().bottom ?? 80
      setVisible(sentinelTop <= navBottom)
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Link
      href={`/${HOME_MENU_SECTION_HASH}`}
      onClick={() => sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed top-under-site-nav z-[99] max-w-[min(100%,200px)] border border-coal/15 bg-cream/95 px-3 py-2.5 text-left font-label text-[10px] tracking-[0.3em] uppercase text-coal/90 shadow-md shadow-coal/10 backdrop-blur-sm transition-all duration-200 hover:border-orange hover:text-orange right-4 left-auto sm:right-6 md:left-10 md:right-auto lg:left-12 ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-1"
      }`}
    >
      Back to home
    </Link>
  )
}
