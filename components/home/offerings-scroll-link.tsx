"use client"

import type { ReactNode } from "react"
import { scrollToAnchorById } from "@/lib/anchor-scroll"

const OFFERINGS_HREF = "/#offerings"
/** Match mobile wine-icon scroll depth into `#offerings`. */
const OFFERINGS_SCROLL_EXTRA_OFFSET_PX = -140

type OfferingsScrollLinkProps = {
  className?: string
  children: ReactNode
}

/** In-page link that scrolls to the offerings section like the mobile wine icon. */
export function OfferingsScrollLink({ className, children }: OfferingsScrollLinkProps) {
  return (
    <a
      href={OFFERINGS_HREF}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToAnchorById("offerings", {
          extraOffsetPx: OFFERINGS_SCROLL_EXTRA_OFFSET_PX,
        })
        if (typeof window !== "undefined" && typeof window.history.replaceState === "function") {
          window.history.replaceState(null, "", OFFERINGS_HREF)
        }
      }}
    >
      {children}
    </a>
  )
}
