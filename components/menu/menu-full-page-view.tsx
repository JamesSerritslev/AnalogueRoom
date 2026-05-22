import { MENU_CREAM_SENTINEL_ID } from "@/components/menu/menu-back-to-home-fixed"
import type { MenuSlug, ResolvedMenuPage } from "@/lib/menu-defaults"
import { MENU_SLUGS } from "@/lib/menu-defaults"
import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"

type MenusBySlug = Record<MenuSlug, ResolvedMenuPage>

type MenuFullPageViewProps = {
  menus: MenusBySlug
  heroImageUrl: string
  /** Pulled from `pageHome` offerings in Studio; no fallback menu chrome in repo. */
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroLead?: string | null
  /** When true, shows a Coming Soon state and hides all menu listings. */
  comingSoon?: boolean
}

function MenuCategoryBlock({ menu }: { menu: ResolvedMenuPage }) {
  return (
    <div className="space-y-14">
      {menu.sections.map((section, secIdx) => (
        <div key={`${menu.slug}-${section.title}-${secIdx}`}>
          <h3 className="font-display text-[clamp(20px,2.8vw,26px)] text-coal mb-1">
            {section.title}
          </h3>
          <div className="h-px w-12 bg-orange mb-6" />
          <ul className="divide-y divide-coal/10 border-t border-b border-coal/10">
            {section.items.map((row, rowIdx) => (
              <li
                key={`${section.title}-${rowIdx}-${row.title}`}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[15px] font-medium text-coal">{row.title}</p>
                  {row.description ? (
                    <p className="font-body text-[13px] text-coal/65 mt-1 leading-relaxed">
                      {row.description}
                    </p>
                  ) : null}
                </div>
                {row.price ? (
                  <p className="font-label shrink-0 text-[11px] tracking-[0.2em] uppercase text-orange md:text-right">
                    {row.price.startsWith("$") ? row.price : `$${row.price}`}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function MenuFullPageView({
  menus,
  heroImageUrl,
  heroEyebrow,
  heroTitle,
  heroLead,
  comingSoon = false,
}: MenuFullPageViewProps) {
  const eyebrow = heroEyebrow?.trim()
  const title = (heroTitle?.trim() || "Menu")
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
            <p className="font-label text-[11px] tracking-[0.5em] uppercase text-orange mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-[clamp(36px,5.5vw,56px)] text-cream leading-[1.05] mb-3.5">
            {title}
          </h1>
          <div className="w-15 h-0.5 bg-orange mt-5" />
        </div>
      </section>

      <section className="relative bg-cream px-4 py-16 text-coal sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12">
        <div id={MENU_CREAM_SENTINEL_ID} aria-hidden className="absolute left-0 right-0 top-0 h-px" />
        <div className="mx-auto max-w-[720px]">
          {comingSoon ? (
            <div className="flex flex-col items-center py-12 text-center sm:py-16">
              <p
                className="font-label border border-orange/40 bg-orange/10 px-3 py-2 text-[9px] leading-tight tracking-[0.35em] text-orange uppercase sm:px-3.5 sm:text-[10px] sm:tracking-[0.4em]"
              >
                Coming Soon
              </p>
              <p className="font-body mt-8 max-w-[440px] text-[15px] leading-relaxed text-coal/75">
                Wine, beer, and zero‑proof menus will go here before we open. Follow our{" "}
                <a
                  href={DEFAULT_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-orange/50 text-orange transition-colors hover:border-orange hover:text-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  Instagram
                </a>{" "}
                page for updates.
              </p>
            </div>
          ) : (
            <>
              {lead ? (
                <p className="font-body mb-16 text-center text-[15px] leading-relaxed text-coal/80">
                  {lead}
                </p>
              ) : null}

              {MENU_SLUGS.map((slug, idx) => {
                const menu = menus[slug]
                return (
                  <section
                    key={slug}
                    id={slug}
                    className={`scroll-mt-28 ${idx > 0 ? "mt-16 border-t border-coal/10 pt-16 sm:mt-20 sm:pt-20" : ""} ${idx === 0 && !lead ? "pt-8 sm:pt-10" : ""}`}
                  >
                    <h2 className="font-display text-[clamp(26px,4vw,36px)] text-coal leading-[1.05] mb-3">
                      {menu.pageTitle}
                    </h2>
                    <div className="w-12 h-0.5 bg-orange mb-6" />
                    {menu.intro.trim() ? (
                      <p className="font-body text-[15px] leading-relaxed text-coal/80 mb-10">
                        {menu.intro}
                      </p>
                    ) : null}
                    <MenuCategoryBlock menu={menu} />
                  </section>
                )
              })}
            </>
          )}
        </div>
      </section>
    </>
  )
}
