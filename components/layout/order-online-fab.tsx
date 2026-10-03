"use client"

import { useEffect, useRef, useState } from "react"
import { DEFAULT_ORDER_ONLINE_URL } from "@/lib/content-defaults"

/**
 * Chat-bubble style Order Online CTA — fixed bottom-right, opaque cream.
 * Hides on scroll down, fades in on scroll up (mobile + desktop).
 */
export function OrderOnlineFab() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastScrollY.current

      if (y <= 16) {
        setVisible(true)
      } else if (diff > 10) {
        setVisible(false)
      } else if (diff < -10) {
        setVisible(true)
      }

      lastScrollY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
