"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="relative z-[1] min-h-dvh min-w-0 w-full max-w-full overflow-x-hidden animate-page-enter"
    >
      {children}
    </div>
  )
}
