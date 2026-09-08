import type { ReactNode } from "react"

const PAGE_TITLE_CLASS =
  "font-display mb-3.5 text-[clamp(40px,6vw,72px)] leading-[1.05] text-cream"

export const MENU_HERO_TITLE_CLASS =
  "font-display mb-3.5 text-[clamp(36px,5.5vw,56px)] leading-[1.05] text-cream"

type InteriorHeroTextProps = {
  eyebrow?: ReactNode
  children: ReactNode
  titleClassName?: string
}

/** First-screen interior hero copy. */
export function InteriorHeroText({
  eyebrow,
  children,
  titleClassName = PAGE_TITLE_CLASS,
}: InteriorHeroTextProps) {
  return (
    <div className="relative z-2">
      {eyebrow ? (
        <p className="font-label mb-4 text-[11px] tracking-[0.5em] text-orange uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className={titleClassName}>{children}</h1>
      <div className="mt-5 h-0.5 w-15 bg-orange" />
    </div>
  )
}
