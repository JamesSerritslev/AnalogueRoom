import type { MenuSlug, MenuSection, ResolvedMenuPage } from "@/lib/menu-defaults"
import { MENU_SECTION_PAGE_TITLE } from "@/lib/menu-defaults"
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
): MenuSection[] {
  if (!raw?.length) return []
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
  return out
}

function docMenuKey(slug: MenuSlug): keyof PageMenusDoc {
  if (slug === "beer") return "beer"
  if (slug === "zero-proof") return "zeroProof"
  return "wines"
}

function resolveOne(
  slug: MenuSlug,
  doc: PageMenusDoc | null | undefined,
): ResolvedMenuPage {
  const sections = normalizeCategories(doc?.[docMenuKey(slug)])
  return {
    slug,
    pageTitle: MENU_SECTION_PAGE_TITLE[slug],
    intro: "",
    sections,
  }
}

export function resolveMenuForSlug(
  slug: MenuSlug,
  doc: PageMenusDoc | null | undefined,
): ResolvedMenuPage {
  return resolveOne(slug, doc)
}

export function resolveAllMenus(
  doc: PageMenusDoc | null | undefined,
): Record<MenuSlug, ResolvedMenuPage> {
  return {
    wines: resolveOne("wines", doc),
    beer: resolveOne("beer", doc),
    "zero-proof": resolveOne("zero-proof", doc),
  }
}
