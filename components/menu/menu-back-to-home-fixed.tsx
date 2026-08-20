"use client"

import { useEffect, useState } from "react"
import { scrollDrinksMenuToId } from "@/lib/menu-section-scroll"

/** Sentinel element rendered at the top of the cream menu section. */
export const MENU_CREAM_SENTINEL_ID = "menu-cream-sentinel"

/** Pixels scrolled before the control may appear (avoids flash at page top). */
const SCROLL_SHOW_AFTER_PX = 120

const DRINKS_SECTION_LINKS = [
  { label: "Wine", hash: "wines" },
  { label: "Beer", hash: "beer" },
] as const

/**
 * Fixed under the site nav on the drinks menu. Hidden until the user scrolls
 * down a bit and the cream section reaches the nav line. Mobile: right. md+: left.
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
      const scrolledEnough = window.scrollY >= SCROLL_SHOW_AFTER_PX
      const sentinelTop = sentinel.getBoundingClientRect().top
      const navBottom = nav?.getBoundingClientRect().bottom ?? 80
      setVisible(scrolledEnough && sentinelTop <= navBottom)
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
    <div
      aria-hidden={!visible}
      className={`fixed top-under-site-nav z-[99] flex max-w-[min(100%,11.5rem)] flex-col gap-1 right-4 left-auto sm:right-6 md:left-10 md:right-auto lg:left-12 ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-1"
      } transition-all duration-200`}
    >
      {DRINKS_SECTION_LINKS.map((link) => (
        <a
          key={link.hash}
          href={`#${link.hash}`}
          tabIndex={visible ? 0 : -1}
          onClick={(e) => {
            e.preventDefault()
            window.history.replaceState(null, "", `#${link.hash}`)
            scrollDrinksMenuToId(link.hash)
          }}
          className="border border-coal/15 bg-cream/95 px-3 py-1.5 text-left font-label text-[11px] tracking-[0.26em] uppercase text-coal shadow-md shadow-coal/10 backdrop-blur-sm transition-colors hover:border-orange hover:text-orange"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
