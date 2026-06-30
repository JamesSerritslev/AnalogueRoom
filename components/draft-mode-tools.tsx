"use client"

import { VisualEditing } from "next-sanity/visual-editing"
import { SanityLive } from "@/sanity/lib/live"

export function DraftModeTools() {
  return (
    <>
      <VisualEditing />
      <SanityLive />
    </>
  )
}
