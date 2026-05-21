import Image from "next/image"
import { HeroScrollDown } from "@/components/home/hero-scroll-down"
import {
  DEFAULT_HERO_EYEBROW,
  DEFAULT_HERO_HEADLINE_LINE1,
  DEFAULT_HERO_HEADLINE_LINE2,
  DEFAULT_HERO_LEAD,
  DEFAULT_HERO_META_HOURS,
  DEFAULT_HERO_META_LOCATION,
  DEFAULT_INSTAGRAM_HANDLE,
} from "@/lib/content-defaults"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

export async function HeroSection() {
  const [{ homeHeroUrl, siteLogoUrl, heroLead }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const eyebrow = L.home?.heroEyebrow || DEFAULT_HERO_EYEBROW
  const line1 = L.home?.heroHeadlineLine1 || DEFAULT_HERO_HEADLINE_LINE1
  const line2 = L.home?.heroHeadlineLine2 || DEFAULT_HERO_HEADLINE_LINE2
  const lead = heroLead || DEFAULT_HERO_LEAD
  const metaHours = L.home?.heroMetaHours || DEFAULT_HERO_META_HOURS
  const metaLocation = L.home?.heroMetaLocation || DEFAULT_HERO_META_LOCATION
  const instagramHandle = L.brand?.instagramHandle || DEFAULT_INSTAGRAM_HANDLE

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pt-[120px] pb-28 text-center">
      <div
        className="hero-bg-photo hero-bg-drift-pulse"
        style={{ backgroundImage: `url(${homeHeroUrl})` }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-2 mx-auto w-full max-w-[880px]">
        <p className="hero-intro hero-intro-d1 font-label mb-6 text-[10px] tracking-[0.35em] text-orange drop-shadow-lg sm:mb-8 sm:text-[11px] sm:tracking-[0.45em] md:tracking-[0.5em] uppercase">
          {eyebrow}
        </p>

        <Image
          src={siteLogoUrl}
          alt="The Analogue Room"
          width={260}
          height={260}
          className="hero-intro hero-intro-d2 mx-auto mb-10 w-[min(260px,55vw)] aspect-square object-contain drop-shadow-xl"
          priority
          quality={90}
        />

        <h1 className="hero-intro hero-intro-d3 font-display mb-6 text-[clamp(32px,6vw,58px)] leading-[1.1] text-cream drop-shadow-lg sm:mb-7">
          <span className="block">
            {renderHeadlineAccent(line1, HOME_HEADLINE_ACCENTS.heroLine1)}
          </span>
          <span className="block">{line2}</span>
        </h1>

        {/* Divider */}
        <div className="hero-intro hero-intro-d4 my-8 flex items-center justify-center gap-3.5">
          <div className="w-15 h-px bg-cream/40" />
          <span className="text-orange text-sm">★</span>
          <div className="w-15 h-px bg-cream/40" />
        </div>

        <p className="hero-intro hero-intro-d5 font-body mx-auto mb-10 max-w-[540px] text-sm font-normal leading-relaxed text-cream/85 drop-shadow-md">
          {lead}
        </p>

        {/* Meta info */}
        <div className="hero-intro hero-intro-d6 mt-8 flex flex-wrap justify-center gap-x-8 gap-y-6 border-t border-cream/20 pt-8 sm:gap-x-10 sm:gap-y-7 md:gap-x-12">
          <div className="text-center">
            <p className="font-label mb-1.5 text-[9px] tracking-[0.4em] uppercase text-orange">
              Hours
            </p>
            <p className="font-display text-sm text-cream">{metaHours}</p>
          </div>
          <div className="text-center">
            <p className="font-label mb-1.5 text-[9px] tracking-[0.4em] uppercase text-orange">
              Location
            </p>
            <p className="font-display text-sm text-cream">{metaLocation}</p>
          </div>
          <div className="text-center">
            <p className="font-label mb-1.5 text-[9px] tracking-[0.4em] uppercase text-orange">
              Follow
            </p>
            <p className="font-display text-sm text-cream">{instagramHandle}</p>
          </div>
        </div>
      </div>

      <HeroScrollDown />
    </section>
  )
}
