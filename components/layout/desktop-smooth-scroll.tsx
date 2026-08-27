"use client"

import { ReactLenis } from "lenis/react"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import type { LenisRef } from "lenis/react"

const DESKTOP_SCROLL_MQ =
  "(min-width: 768px) and (hover: hover) and (pointer: fine)"

function bindLenis(node: LenisRef | null) {
  if (typeof window === "undefined") return
  if (node?.lenis) {
    window.__analogueLenis = node.lenis
  } else {
    delete window.__analogueLenis
  }
}

/**
 * Smooth mouse-wheel scrolling on desktop only. Phones keep native touch scroll.
 */
export function DesktopSmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [enable, setEnable] = useState(false)
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/")

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_SCROLL_MQ)
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)")
    const apply = () => setEnable(desktop.matches && motion.matches)
    apply()
    desktop.addEventListener("change", apply)
    motion.addEventListener("change", apply)
    return () => {
      desktop.removeEventListener("change", apply)
      motion.removeEventListener("change", apply)
      delete window.__analogueLenis
    }
  }, [])

  if (isStudio || !enable) {
    return children
  }

  return (
    <ReactLenis
      root
      ref={bindLenis}
      options={{
        autoRaf: true,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 0.88,
        syncTouch: false,
        anchors: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
