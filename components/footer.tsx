import Link from "next/link"
import Image from "next/image"
import { NewsletterSignupLazy } from "@/components/newsletter-signup-lazy"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import {
  DEFAULT_ADDRESS,
  DEFAULT_COPYRIGHT_LINE,
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_SISTER_PROPERTY_NAME,
  DEFAULT_SISTER_PROPERTY_URL,
  DEFAULT_TAGLINE,
} from "@/lib/content-defaults"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"

/** Shared center axis with `#newsletter` — both use the same max width and mx-auto. */
const footerCenterColumn = "mx-auto w-full max-w-md md:max-w-lg"

export async function Footer() {
  const [{ siteLogoUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const tagline = L.brand?.tagline || DEFAULT_TAGLINE
  const address = DEFAULT_ADDRESS
  const instagramHandle = DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = DEFAULT_INSTAGRAM_URL
  const sisterPropertyName = DEFAULT_SISTER_PROPERTY_NAME
  const sisterPropertyUrl = DEFAULT_SISTER_PROPERTY_URL

  const addressLines = address.split("\n").filter(Boolean)

  const logoLink = (
    <Link
      href="/"
      className="inline-flex shrink-0 rounded-full outline outline-2 outline-orange outline-offset-2 md:outline-offset-4"
    >
      <Image
        src={siteLogoUrl}
        alt="The Analogue Room"
        width={80}
        height={80}
        className="h-16 w-16 rounded-full object-contain md:h-20 md:w-20"
      />
    </Link>
  )

  const addressBlock = (
    <>
      <p className="text-[13px] leading-relaxed text-cream/70">
        <strong className="font-label mb-2 block text-[10px] tracking-[0.3em] uppercase text-orange">
          The Analogue Room
        </strong>
        <a
          href={VENUE_APPLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          {addressLines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < addressLines.length - 1 && <br />}
            </span>
          ))}
        </a>
      </p>
      <a
        href={sisterPropertyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-label border-b border-orange/40 pb-0.5 text-[10px] tracking-[0.3em] uppercase text-orange transition-colors hover:text-cream"
      >
        Visit {sisterPropertyName} →
      </a>
    </>
  )

  return (
    <footer className="relative z-2 min-w-0 max-w-full overflow-x-hidden bg-coal px-4 py-16 text-cream sm:px-6 sm:py-20 md:px-10 md:py-22 lg:px-12">
      <RevealOnScroll eager>
        <div className="relative mx-auto mb-12 w-full max-w-[1200px] md:mb-14 md:min-h-24">
          {/* Logo & address flank the row on md+ without shifting the center axis */}
          <div className="absolute left-0 top-0 hidden md:block">{logoLink}</div>
          <div className="absolute right-0 top-0 hidden max-w-[220px] flex-col gap-6 text-right md:flex">
            {addressBlock}
          </div>

          {/* Mobile: logo above the centered column */}
          <div className="mb-10 flex justify-center md:hidden">{logoLink}</div>

          {/* Tagline & social — same center line as #newsletter below */}
          <div
            className={`${footerCenterColumn} flex flex-col items-center gap-6 text-center`}
          >
            <p className="font-display text-sm leading-snug text-cream/80">
              {tagline}
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-orange px-5 py-3 font-label text-[11px] tracking-[0.28em] uppercase text-orange transition-colors hover:bg-orange hover:text-coal sm:min-h-0 sm:py-2.5 sm:tracking-[0.3em]"
            >
              Follow {instagramHandle}
            </a>
          </div>

          {/* Mobile: address below the centered column */}
          <div className="mt-10 flex flex-col items-center gap-6 text-center md:hidden">
            {addressBlock}
          </div>
        </div>
      </RevealOnScroll>

      {/* Outside reveal so deep links (#newsletter) always target a painted anchor */}
      <div
        id="newsletter"
        className={`${footerCenterColumn} mb-12 scroll-mt-[9.5rem] border-t border-cream/10 pt-10 md:scroll-mt-[10.5rem]`}
      >
        <NewsletterSignupLazy />
      </div>

      <RevealOnScroll eager className="mx-auto max-w-[1200px]">
        <p className="border-t border-cream/10 pt-6 text-center font-label text-[10px] uppercase tracking-[0.3em] text-cream/40">
          {DEFAULT_COPYRIGHT_LINE}
        </p>
      </RevealOnScroll>
    </footer>
  )
}
