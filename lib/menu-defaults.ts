/** Menu anchors on `/menu#…`; line items load only from Studio `pageMenus`. */

export const MENU_SLUGS = ["wines", "beer", "zero-proof"] as const
export type MenuSlug = (typeof MENU_SLUGS)[number]

type MenuItemRow = {
  title: string
  description?: string
  price?: string
}

export type MenuSection = {
  title: string
  items: MenuItemRow[]
}

/** One block shown under each anchor (wines / beer / zero-proof). */
export type ResolvedMenuPage = {
  slug: MenuSlug
  pageTitle: string
  intro: string
  sections: MenuSection[]
}

/** Fallback section heading when Sanity has categories but no per-menu title document field. */
export const MENU_SECTION_PAGE_TITLE: Record<MenuSlug, string> = {
  wines: "Wines",
  beer: "Beer",
  "zero-proof": "Zero proof",
}

export function isMenuSlug(s: string): s is MenuSlug {
  return (MENU_SLUGS as readonly string[]).includes(s)
}
