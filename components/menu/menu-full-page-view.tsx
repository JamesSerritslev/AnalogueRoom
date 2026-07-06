import { MENU_CREAM_SENTINEL_ID } from "@/components/menu/menu-back-to-home-fixed"
import type { MenuCategory, MenuItemRow, MenuSection } from "@/lib/menu-defaults"

type MenuFullPageViewProps = {
  sections: MenuSection[]
  heroImageUrl: string
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroLead?: string | null
}

/** Print-style money: "$13", "$12 / 15", "$3 / 6" */
function formatMoney(value: string): string {
  const t = value.trim()
  if (!t) return ""
  if (t.startsWith("$")) return t
  return `$${t}`
}

const priceCellClass =
  "shrink-0 text-right font-body text-[14px] tabular-nums leading-none text-orange sm:text-[15px]"

function CategoryPriceHeaders({ columns }: { columns: MenuCategory["columns"] }) {
  if (columns === "glass-bottle") {
    return (
      <div className="mb-2 flex items-end justify-end gap-4 sm:gap-6">
        <span className="font-label w-[4.75rem] text-right text-[9px] tracking-[0.2em] uppercase text-coal/45 sm:w-[5.5rem]">
          Glass
        </span>
        <span className="font-label w-10 text-right text-[9px] tracking-[0.2em] uppercase text-coal/45 sm:w-12">
          Bottle
        </span>
      </div>
    )
  }
  if (columns === "bottle-can") {
    return (
      <div className="mb-2 flex items-end justify-end">
        <span className="font-label w-[4.75rem] text-right text-[9px] tracking-[0.16em] uppercase text-coal/45 sm:w-[5.5rem]">
          Bottle/Can
        </span>
      </div>
    )
  }
  return null
}

function ItemPrices({
  row,
  columns,
}: {
  row: MenuItemRow
  columns: MenuCategory["columns"]
}) {
  if (columns === "glass-bottle") {
    return (
      <div className="flex shrink-0 items-baseline justify-end gap-4 sm:gap-6">
        <span className={`${priceCellClass} w-[4.75rem] sm:w-[5.5rem]`}>
          {row.glassPrice ? formatMoney(row.glassPrice) : "\u00a0"}
        </span>
        <span className={`${priceCellClass} w-10 sm:w-12`}>
          {row.bottlePrice ? formatMoney(row.bottlePrice) : "\u00a0"}
        </span>
      </div>
    )
  }
  if (columns === "bottle-can") {
    const value = row.bottlePrice || row.price
    return (
      <div className="flex shrink-0 items-baseline justify-end">
        <span className={`${priceCellClass} w-[4.75rem] sm:w-[5.5rem]`}>
          {value ? formatMoney(value) : "\u00a0"}
        </span>
      </div>
    )
  }
  const value = row.price || row.bottlePrice || row.glassPrice
  if (!value) return null
  return <span className={`${priceCellClass} ml-4`}>{formatMoney(value)}</span>
}

function categoryAnchorId(sectionSlug: string | undefined, categoryTitle: string): string | undefined {
  const t = categoryTitle.trim().toLowerCase()
  if (t === "zero proof" || t.startsWith("zero proof")) return "zero-proof"
  if (sectionSlug === "wines" && t === "spritz") return "spritz"
  return undefined
}

function MenuCategoryBlock({
  category,
  sectionSlug,
}: {
  category: MenuCategory
  sectionSlug?: string
}) {
  const anchorId = categoryAnchorId(sectionSlug, category.title)

  return (
    <div id={anchorId} className={anchorId ? "scroll-mt-28" : undefined}>
      <div className="mb-1 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <h3 className="font-label text-[11px] tracking-[0.28em] uppercase text-coal">
          {category.title}
        </h3>
      </div>
      <div className="mb-4 h-px w-10 bg-orange" />
      <CategoryPriceHeaders columns={category.columns} />
      <ul className="divide-y divide-coal/10 border-t border-b border-coal/10">
        {category.items.map((row, rowIdx) => (
          <li
            key={`${category.title}-${rowIdx}-${row.title}`}
            className="flex items-baseline justify-between gap-4 py-3.5 sm:gap-6"
          >
            <div className="min-w-0 flex-1 pr-2">
              <p className="font-body text-[15px] font-medium leading-snug text-coal">
                {row.title}
              </p>
              {row.description ? (
                <p className="mt-1 font-body text-[13px] leading-relaxed text-coal/65">
                  {row.description}
                </p>
              ) : null}
            </div>
            <ItemPrices row={row} columns={category.columns} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MenuFullPageView({
  sections,
  heroImageUrl,
  heroEyebrow,
  heroTitle,
  heroLead,
}: MenuFullPageViewProps) {
  const eyebrow = heroEyebrow?.trim()
  const title = heroTitle?.trim() || "Menu"
  const lead = heroLead?.trim()

  return (
    <>
      <section className="relative flex min-h-[36vh] flex-col justify-end overflow-hidden px-4 pb-10 pt-page-hero sm:min-h-[38vh] sm:px-6 sm:pb-12 md:px-10 lg:px-12">
        <div
          className="interior-hero-photo interior-hero-drift absolute inset-0 z-0"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        >
          <div className="interior-hero-scrim" aria-hidden />
        </div>
        <div className="relative z-2">
          {eyebrow ? (
            <p className="font-label mb-4 text-[11px] tracking-[0.5em] text-orange uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display mb-3.5 text-[clamp(36px,5.5vw,56px)] leading-[1.05] text-cream">
            {title}
          </h1>
          <div className="mt-5 h-0.5 w-15 bg-orange" />
        </div>
      </section>

      <section className="relative bg-cream px-4 py-16 text-coal sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
        <div
          id={MENU_CREAM_SENTINEL_ID}
          aria-hidden
          className="absolute top-0 right-0 left-0 h-px"
        />
        <div className="mx-auto max-w-[720px]">
          {lead ? (
            <p className="font-body mb-16 text-center text-[15px] leading-relaxed text-coal/80">
              {lead}
            </p>
          ) : null}

          <div className={`space-y-16 sm:space-y-20 ${lead ? "" : "pt-8 sm:pt-10"}`}>
            {sections.map((section, idx) => (
              <section
                key={`${section.title}-${idx}`}
                id={section.slug}
                className={`scroll-mt-28 ${idx > 0 ? "border-t border-coal/10 pt-16 sm:pt-20" : ""}`}
              >
                <h2 className="font-display mb-2 text-[clamp(26px,4vw,36px)] leading-[1.05] text-coal">
                  {section.title}
                </h2>
                <div className="mb-4 h-0.5 w-12 bg-orange" />
                {section.note ? (
                  <p className="font-label mb-10 text-[10px] tracking-[0.22em] text-coal/55 uppercase">
                    {section.note}
                  </p>
                ) : (
                  <div className="mb-10" />
                )}
                <div className="space-y-12">
                  {section.categories.map((category, cIdx) => (
                    <MenuCategoryBlock
                      key={`${section.title}-${category.title}-${cIdx}`}
                      category={category}
                      sectionSlug={section.slug}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
