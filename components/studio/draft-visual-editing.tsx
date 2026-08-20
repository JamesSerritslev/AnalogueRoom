"use client"

import { VisualEditing } from "next-sanity/visual-editing"

/** Client-only visual editing overlays. SanityLive must render in a Server Component (see app/layout.tsx). */
export function DraftVisualEditing() {
  return <VisualEditing />
}
