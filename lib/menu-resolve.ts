import type {
  MenuCategory,
  MenuColumns,
  MenuItemRow,
  MenuSection,
} from "@/lib/menu-defaults"
import type {
  PageMenusCategory,
  PageMenusDoc,
  PageMenusItem,
  PageMenusSection,
} from "@/lib/sanity/types"

function normalizeColumns(raw: string | undefined | null): MenuColumns {
  if (raw === "glass-bottle" || raw === "bottle-can") return raw
  return "single"
}

function normalizeItem(it: PageMenusItem | undefined | null): MenuItemRow | null {
  const title = (it?.title ?? it?.name)?.trim()
  if (!title) return null
  const description =
    it?.description?.trim() || it?.note?.trim() || undefined
  const glassPrice = it?.glassPrice?.trim() || undefined
  const bottlePrice = it?.bottlePrice?.trim() || undefined
  const price = it?.price?.trim() || undefined
  return { title, description, glassPrice, bottlePrice, price }
}

function normalizeCategory(
  block: PageMenusCategory | undefined | null,
): MenuCategory | null {
  const title = block?.title?.trim()
  if (!title) return null
  const items =
    block.items
      ?.map((it) => normalizeItem(it))
      .filter(Boolean) ?? []
  if (!items.length) return null
  return {
    title,
    columns: normalizeColumns(block.columns),
    items: items as MenuItemRow[],
  }
}

function sectionSlug(section: PageMenusSection): string | undefined {
  const fromSlug = section.slug?.current?.trim()
  if (fromSlug) return fromSlug
  const title = section.title?.trim().toLowerCase() ?? ""
  if (title.includes("glass")) return "wines"
  if (title.includes("beer")) return "beer"
  if (title.includes("bottle")) return "wines-by-the-bottle"
  return undefined
}

function normalizeSection(
  section: PageMenusSection | undefined | null,
): MenuSection | null {
  const title = section?.title?.trim()
  if (!title) return null
  const categories =
    section.categories
      ?.map((c) => normalizeCategory(c))
      .filter(Boolean) ?? []
  if (!categories.length) return null
  return {
    title,
    slug: sectionSlug(section),
    note: section.note?.trim() || undefined,
    categories: categories as MenuCategory[],
  }
}

/**
 * Resolve the full print-order menu from Studio.
 * Falls back to legacy wines / beer / zeroProof fields if `sections` is empty.
 */
export function resolveMenuSections(
  doc: PageMenusDoc | null | undefined,
): MenuSection[] {
  if (doc?.sections?.length) {
    return doc.sections
      .map((s) => normalizeSection(s))
      .filter(Boolean) as MenuSection[]
  }

  // Legacy three-column shape (pre–print-format menu)
  const legacy: MenuSection[] = []
  const wines = doc?.wines
    ?.map((c) => normalizeCategory({ ...c, columns: c.columns ?? "glass-bottle" }))
    .filter(Boolean) as MenuCategory[] | undefined
  if (wines?.length) {
    legacy.push({
      title: "Wines By the Glass",
      slug: "wines",
      note: "6 oz OR 9 oz Glass Pour Available",
      categories: wines,
    })
  }
  const beer = doc?.beer
    ?.map((c) => normalizeCategory({ ...c, columns: c.columns ?? "bottle-can" }))
    .filter(Boolean) as MenuCategory[] | undefined
  if (beer?.length) {
    legacy.push({ title: "Beers", slug: "beer", categories: beer })
  }
  const zero = doc?.zeroProof
    ?.map((c) => normalizeCategory({ ...c, columns: c.columns ?? "glass-bottle" }))
    .filter(Boolean) as MenuCategory[] | undefined
  if (zero?.length) {
    legacy.push({ title: "Zero Proof", slug: "zero-proof", categories: zero })
  }
  return legacy
}
