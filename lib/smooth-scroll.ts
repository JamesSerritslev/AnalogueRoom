/** Pixel scroll for in-page anchors. */
export function smoothScrollToY(top: number, behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior })
}
