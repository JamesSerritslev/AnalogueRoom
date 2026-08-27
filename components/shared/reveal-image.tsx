"use client"

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

type RevealImageProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.94 && rect.bottom > 0
}

/** Fade images in as they enter view. Starts visible so nothing can get stuck hidden. */
export function RevealImage({
  children,
  className = "",
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"shown" | "pending" | "visible">("shown")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (isInViewport(el)) return

    let shown = false
    let obs: IntersectionObserver | null = null

    const cleanupScroll = () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }

    const show = () => {
      if (shown) return
      shown = true
      setPhase("visible")
      obs?.disconnect()
      cleanupScroll()
    }

    function onScrollOrResize() {
      if (isInViewport(el)) show()
    }

    setPhase("pending")

    obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) show()
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0 },
    )
    obs.observe(el)

    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      obs?.disconnect()
      cleanupScroll()
    }
  }, [])

  const phaseClass =
    phase === "pending"
      ? "reveal-image-pending"
      : phase === "visible"
        ? "reveal-image-visible"
        : ""

  return (
    <div
      ref={ref}
      className={`reveal-image ${phaseClass} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
