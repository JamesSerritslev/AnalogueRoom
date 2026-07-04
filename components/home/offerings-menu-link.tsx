"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { HOME_SCROLL_STORAGE_KEY } from "@/lib/menu-scroll-storage"

type OfferingsMenuLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function OfferingsMenuLink({ href, className, children }: OfferingsMenuLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(window.scrollY))
      }}
    >
      {children}
    </Link>
  )
}
