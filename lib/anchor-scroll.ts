export type ScrollToAnchorOptions = {
  /** Gap below fixed nav after applying the element's `scroll-margin-top` */
  extraOffsetPx?: number
  behavior?: ScrollBehavior
}

/**
 * Scroll so the element sits below the fixed header. Uses CSS `scroll-margin-top`
 * on the target (`scroll-mt-*`), then subtracts optional extra spacing.
 */
export function scrollToAnchorById(
  elementId: string,
  options?: ScrollToAnchorOptions,
): boolean {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false
  }

  const el = document.getElementById(elementId)
  if (!el) return false

  const scrollMarginTop =
    Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const extra = options?.extraOffsetPx ?? 20
  const docTop = el.getBoundingClientRect().top + window.scrollY
  const top = Math.max(0, docTop - scrollMarginTop - extra)

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const behavior = reduceMotion ? "auto" : (options?.behavior ?? "smooth")

  window.scrollTo({ top, left: 0, behavior })
  return true
}
