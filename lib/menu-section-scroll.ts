/** Shared scroll helpers for drinks menu section anchors. */

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
}

/**
 * Gap below the fixed nav when aligning a section.
 * Wine on mobile needs more clearance so “Wines by the glass” isn’t clipped.
 */
function clearanceBelowNav(id: string): number {
  if (id === "wines" && isMobileViewport()) return 88
  return 12
}

/**
 * Extra distance to scroll past the section's sticky-nav alignment.
 * Beer sits lower on the page — push further so it lands clearly in view.
 */
function extraScrollForId(id: string): number {
  if (id === "beer") return 70
  return 0
}

export function scrollDrinksMenuToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector("nav") as HTMLElement | null
  const navBottom = nav?.getBoundingClientRect().bottom ?? 64
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    navBottom -
    clearanceBelowNav(id) +
    extraScrollForId(id)
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  })
}
