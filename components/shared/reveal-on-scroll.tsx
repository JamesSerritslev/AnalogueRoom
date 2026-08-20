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

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      {
        rootMargin: eager ? "0px 0px -4% 0px" : "0px 0px -14% 0px",
        threshold: 0.06,
      },
    )

    obs.observe(el)
    return () => obs.disconnect()
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
