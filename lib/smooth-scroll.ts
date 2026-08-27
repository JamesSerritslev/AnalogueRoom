type LenisLike = {
  scrollTo: (
    target: number,
    options?: { immediate?: boolean; duration?: number },
  ) => void
}

declare global {
  interface Window {
    __analogueLenis?: LenisLike
  }
}

/** Pixel scroll that uses Lenis on desktop when it is running. */
export function smoothScrollToY(top: number, behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return
  const y = Math.max(0, top)
  const lenis = window.__analogueLenis
  if (lenis && behavior !== "auto") {
    lenis.scrollTo(y, { duration: 1.05 })
    return
  }
  window.scrollTo({ top: y, left: 0, behavior })
}
