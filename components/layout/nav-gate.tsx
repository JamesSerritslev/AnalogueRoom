"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

/** Hide the public nav on Sanity Studio routes. */
export function NavGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null
  return children
}
