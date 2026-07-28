import Image from "next/image"
import {
  DEFAULT_HERO_EYEBROW,
  DEFAULT_HERO_LEAD,
  DEFAULT_HERO_META_HOURS,
  DEFAULT_HERO_META_LOCATION,
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_TAGLINE,
} from "@/lib/content-defaults"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"

function renderBrandLine(text: string) {
  return renderHeadlineAccent(text, "Intention")
}

export async function HeroSection() {
  const [{ homeHeroUrl, siteLogoUrl, heroLead }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const eyebrow = DEFAULT_HERO_EYEBROW
  const brandLine = L.brand?.tagline?.trim() || DEFAULT_TAGLINE
  const lead = heroLead || DEFAULT_HERO_LEAD
  const metaLocation = L.home?.heroMetaLocation || DEFAULT_HERO_META_LOCATION
  const metaHours = L.home?.heroMetaHours || DEFAULT_HERO_META_HOURS
  const instagramHandle = DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = DEFAULT_INSTAGRAM_URL

  const metaLabelClass =
    "font-label text-[9px] tracking-[0.4em] uppercase text-orange"
  const metaValueClass =
    "font-display text-sm leading-5 text-cream"
  const metaLinkClass =
    "font-display inline-flex items-center justify-center text-sm leading-5 text-cream transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pt-[120px] pb-28 text-center">
      <div className="hero-bg-photo hero-bg-drift-pulse" aria-hidden>
        <Image
          src={homeHeroUrl}
          alt="Vinyl lounge and wine bar interior at The Analogue Room in Solvang"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </div>

      {/* Content */}
      <div className="relative z-2 mx-auto w-full max-w-[880px]">
        <p className="hero-intro hero-intro-d1 font-label mb-6 text-[10px] tracking-[0.35em] text-orange drop-shadow-lg sm:mb-8 sm:text-[11px] sm:tracking-[0.45em] md:tracking-[0.5em] uppercase">
          {eyebrow}
        </p>

        <Image
          src={siteLogoUrl}
          alt="The Analogue Room logo"
          width={260}
          height={260}
          sizes="(max-width: 640px) 55vw, 260px"
          className="hero-intro hero-intro-d2 mx-auto mb-10 w-[min(260px,55vw)] aspect-square object-contain drop-shadow-xl"
          quality={90}
        />

        <h1 className="hero-intro hero-intro-d3 font-display mb-4 text-[clamp(28px,5.5vw,52px)] leading-[1.1] text-cream drop-shadow-lg sm:mb-5">
          <span className="text-orange">Vinyl Lounge</span>
          {" & Wine Bar in "}
          <span className="text-orange">Solvang</span>
        </h1>

        <p className="hero-intro hero-intro-d3 font-display mb-6 text-[clamp(22px,4vw,36px)] leading-[1.15] text-cream/90 drop-shadow-md sm:mb-7">
          {renderBrandLine(brandLine)}
        </p>

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
        <div className="hero-intro hero-intro-d6 mt-8 grid grid-cols-2 items-start gap-x-6 border-t border-cream/20 pt-8 sm:gap-x-12 md:gap-x-16">
          <div className="flex min-w-0 flex-col items-center text-center">
            <p className={`${metaLabelClass} min-h-[14px]`}>Hours</p>
            <p className={`${metaValueClass} mt-1.5`}>{metaHours}</p>
          </div>
          <div className="flex min-w-0 flex-col items-center text-center">
            <p className={`${metaLabelClass} min-h-[14px]`}>Location</p>
            <a
              href={VENUE_APPLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${metaLinkClass} mt-1.5 text-center`}
            >
              {metaLocation}
            </a>
          </div>
        </div>

        <div className="hero-intro hero-intro-d7 mt-8 flex flex-col items-center text-center">
          <p className={`${metaLabelClass} min-h-[14px]`}>Follow</p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${metaLinkClass} mt-1.5`}
          >
            {instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
