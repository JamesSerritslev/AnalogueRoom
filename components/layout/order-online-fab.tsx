"use client"

import { useEffect, useRef, useState } from "react"
import { DEFAULT_ORDER_ONLINE_URL } from "@/lib/content-defaults"

const WHAT_WE_ARE_ID = "what-we-are"

/**
 * Chat-bubble style Order Online CTA — fixed bottom-right, opaque cream.
 * Hides on scroll down / shows on scroll up until the visitor scrolls past
 * “What You’ll Find Here” (`#what-we-are`); after that it stays visible.
 * Hidden while the mobile side nav is open so it never overlaps the drawer.
 */
export function OrderOnlineFab() {
  const [scrollVisible, setScrollVisible] = useState(true)
  const [pastWhatYouFind, setPastWhatYouFind] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const updatePastSection = () => {
      const el = document.getElementById(WHAT_WE_ARE_ID)
      if (!el) {
        setPastWhatYouFind(false)
        return
      }
      // Fully scrolled past the section (bottom edge above the sticky nav band).
      setPastWhatYouFind(el.getBoundingClientRect().bottom <= 96)
    }

    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastScrollY.current

      updatePastSection()

      if (y <= 16) {
        setScrollVisible(true)
      } else if (diff > 10) {
        setScrollVisible(false)
      } else if (diff < -10) {
        setScrollVisible(true)
      }

      lastScrollY.current = y
    }

    updatePastSection()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", updatePastSection)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", updatePastSection)
    }
  }, [])

  useEffect(() => {
    const onMobileNav = (e: Event) => {
      const open = Boolean((e as CustomEvent<{ open?: boolean }>).detail?.open)
      setMenuOpen(open)
    }
    window.addEventListener("ar-mobile-nav", onMobileNav)
    return () => window.removeEventListener("ar-mobile-nav", onMobileNav)
  }, [])

  const visible = (pastWhatYouFind || scrollVisible) && !menuOpen

  return (
    <a
      href={DEFAULT_ORDER_ONLINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed z-[110] inline-flex min-h-12 items-center justify-center rounded-full border border-coal/10 bg-cream px-5 py-3 font-display text-[13px] tracking-[0.04em] text-coal shadow-lg shadow-coal/25 transition-[opacity,transform] duration-300 ease-out right-4 sm:right-6 sm:min-h-14 sm:px-6 sm:text-[14px] sm:tracking-[0.05em] bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] hover:border-coal/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      Order Online
    </a>
  )
}
