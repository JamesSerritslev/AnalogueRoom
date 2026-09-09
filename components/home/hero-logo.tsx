"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function HeroLogo({ src }: { src: string }) {
  const [spin, setSpin] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setSpin(true)
  }, [])

  return (
    <div className="mx-auto mb-10 aspect-square w-[min(260px,55vw)]">
      <Image
        src={src}
        alt="Analogue Room logo"
        width={260}
        height={260}
        sizes="(max-width: 640px) 55vw, 260px"
        priority
        quality={90}
        className={`aspect-square w-full object-contain drop-shadow-xl ${
          spin ? "hero-logo-spin-active" : ""
        }`}
      />
    </div>
  )
}
