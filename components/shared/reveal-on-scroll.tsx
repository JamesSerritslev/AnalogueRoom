"use client"

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

type RevealOnScrollProps = {
  children: ReactNode
  className?: string
  /** Stagger siblings with different delays (ms). */
  delay?: number
  /** Larger root margin; fires when element is farther from viewport bottom. */
  eager?: boolean
}

function isInViewport(el: HTMLElement, eager: boolean) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const margin = eager ? 0 : vh * 0.08
  return rect.top < vh - margin && rect.bottom > 0
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  eager = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let shown = false
    let obs: IntersectionObserver | null = null

    const cleanupScroll = () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }

    const show = () => {
      if (shown) return
      shown = true
      setVisible(true)
      obs?.disconnect()
      cleanupScroll()
    }

    function onScrollOrResize() {
      if (isInViewport(el, eager)) show()
    }

    if (isInViewport(el, eager)) {
      show()
      return
    }

    obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) show()
      },
      {
        root: null,
        rootMargin: eager ? "80px 0px 80px 0px" : "0px 0px -8% 0px",
        threshold: 0,
      },
    )
    obs.observe(el)

    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      obs?.disconnect()
      cleanupScroll()
    }
  }, [eager])

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={`reveal-scope ${visible ? "reveal-scope-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  )
}
