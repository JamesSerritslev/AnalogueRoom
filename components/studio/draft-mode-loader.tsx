"use client"

import dynamic from "next/dynamic"

const DraftVisualEditing = dynamic(
  () =>
    import("@/components/studio/draft-visual-editing").then((m) => m.DraftVisualEditing),
  { ssr: false },
)

export function DraftModeLoader() {
  return <DraftVisualEditing />
}
