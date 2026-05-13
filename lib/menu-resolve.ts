import type { MenuSlug, MenuSection, ResolvedMenuPage } from "@/lib/menu-defaults"
import { getDefaultMenuForSlug } from "@/lib/menu-defaults"
import type { PageMenusCategory, PageMenusDoc, PageMenusMenuItem } from "@/lib/sanity/types"

function normalizeItem(it: PageMenusMenuItem | undefined | null) {
  const title = (it?.title ?? it?.name)?.trim()
  if (!title) return null
  const descRaw = it?.description?.trim()
  const noteRaw = it?.note?.trim()
  const description = descRaw || noteRaw || undefined
  const price = it?.price?.trim() || undefined
  return { title, description, price }
}

function normalizeCategories(
  raw: PageMenusCategory[] | undefined | null,
): MenuSection[] | null {
  if (!raw?.length) return null
  const out: MenuSection[] = []
  for (const block of raw) {
    const title = block?.title?.trim()
    if (!title) continue
    const items =
      block.items
        ?.map((it) => normalizeItem(it))
        .filter(Boolean) ?? []
    if (items.length) {
      out.push({ title, items: items as MenuSection["items"] })
    }
  }
  return out.length ? out : null
}

function mergeResolved(
  slug: MenuSlug,
  doc: PageMenusDoc | null | undefined,
): ResolvedMenuPage {
  const base = getDefaultMenuForSlug(slug)
  const key =
    slug === "wines" ? "wines" : slug === "beer" ? "beer" : "zeroProof"
  const fromDoc = normalizeCategories(doc?.[key])
  if (!fromDoc) return base
  return {
    ...base,
    sections: fromDoc,
  }
}

export function resolveMenuForSlug(
  slug: MenuSlug,
  doc: PageMenusDoc | null | undefined,
): ResolvedMenuPage {
  return mergeResolved(slug, doc)
}

export function resolveAllMenus(
  doc: PageMenusDoc | null | undefined,
): Record<MenuSlug, ResolvedMenuPage> {
  return {
    wines: resolveMenuForSlug("wines", doc),
    beer: resolveMenuForSlug("beer", doc),
    "zero-proof": resolveMenuForSlug("zero-proof", doc),
  }
}
