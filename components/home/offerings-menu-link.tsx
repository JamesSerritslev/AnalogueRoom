"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import type { MenuSlug } from "@/lib/menu-defaults"
import { HOME_SCROLL_STORAGE_KEY } from "@/lib/menu-scroll-storage"

type OfferingsMenuLinkProps = {
  slug: MenuSlug
  className?: string
  children: ReactNode
}

export function OfferingsMenuLink({ slug, className, children }: OfferingsMenuLinkProps) {
  return (
    <Link
      href={`/menu#${slug}`}
      className={className}
      onClick={() => {
        sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(window.scrollY))
      }}
    >
      {children}
    </Link>
  )
}
