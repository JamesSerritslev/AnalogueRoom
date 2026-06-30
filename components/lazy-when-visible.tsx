"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

type LazyWhenVisibleProps = {
  children: ReactNode
  className?: string
  /** Fixed-height placeholder while off-screen (avoids layout shift). */
  placeholder?: ReactNode
  rootMargin?: string
}

export function LazyWhenVisible({
  children,
  className = "",
  placeholder = null,
  rootMargin = "200px",
}: LazyWhenVisibleProps) {
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
      { rootMargin, threshold: 0 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  )
}
