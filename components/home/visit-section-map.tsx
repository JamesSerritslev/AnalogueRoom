"use client"

import dynamic from "next/dynamic"

const VenueMap = dynamic(() => import("@/components/VenueMap"), {
  ssr: false,
})

export function VisitSectionMap() {
  return (
    <div className="mt-16 max-w-[1100px] mx-auto w-full overflow-hidden border-2 border-coal/10">
      <VenueMap />
    </div>
  )
}
