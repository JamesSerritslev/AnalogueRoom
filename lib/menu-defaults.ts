/** Menu anchors on `/wine-and-beer-menu#…`; line items load only from Studio `pageMenus`. */

export const MENU_SLUGS = ["wines", "beer", "zero-proof"] as const
export type MenuSlug = (typeof MENU_SLUGS)[number]

export type MenuColumns = "glass-bottle" | "bottle-can" | "single"

export type MenuItemRow = {
  title: string
  description?: string
  /** Glass column (e.g. "13" or "12 / 15" for 6 oz / 9 oz). */
  glassPrice?: string
  /** Bottle / can column. */
  bottlePrice?: string
  /** Single price column (beer, bottle list, spritz). */
  price?: string
}

export type MenuCategory = {
  title: string
  columns: MenuColumns
  items: MenuItemRow[]
}

/** Major block matching the printed menu (Wines By the Glass, Beers, …). */
export type MenuSection = {
  title: string
  /** Anchor id for /wine-and-beer-menu#… (e.g. wines, beer). */
  slug?: string
  note?: string
  categories: MenuCategory[]
}

export function isMenuSlug(s: string): s is MenuSlug {
  return (MENU_SLUGS as readonly string[]).includes(s)
}

/** Map home offerings cards → menu section anchors. */
export const MENU_SLUG_TO_SECTION_SLUG: Record<MenuSlug, string> = {
  wines: "wines",
  beer: "beer",
  "zero-proof": "zero-proof",
}
