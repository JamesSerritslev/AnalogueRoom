"use client"

import dynamic from "next/dynamic"

const DraftModeTools = dynamic(
  () => import("@/components/draft-mode-tools").then((m) => m.DraftModeTools),
  { ssr: false },
)

export function DraftModeLoader({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return <DraftModeTools />
}
