"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/")

  return (
    <div
      key={isStudio ? "studio" : pathname}
      className={`relative z-[1] min-h-dvh min-w-0 w-full max-w-full ${
        isStudio ? "" : "page-transition"
      }`}
    >
      {children}
    </div>
  )
}
