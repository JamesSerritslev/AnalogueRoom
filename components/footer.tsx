import Link from "next/link"
import Image from "next/image"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"
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

export async function Footer() {
  const [{ siteLogoUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const tagline = L.brand?.tagline || DEFAULT_TAGLINE
  const address = L.brand?.address || DEFAULT_ADDRESS
  const instagramHandle = L.brand?.instagramHandle || DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = L.brand?.instagramUrl || DEFAULT_INSTAGRAM_URL
  const sisterPropertyName = L.brand?.sisterPropertyName || DEFAULT_SISTER_PROPERTY_NAME
  const sisterPropertyUrl = L.brand?.sisterPropertyUrl || DEFAULT_SISTER_PROPERTY_URL

  const addressLines = address.split("\n").filter(Boolean)

  return (
    <footer className="relative z-2 min-w-0 max-w-full overflow-x-hidden bg-coal px-4 py-16 text-cream sm:px-6 sm:py-20 md:px-10 md:py-22 lg:px-12">
      <RevealOnScroll eager className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid max-md:grid-cols-[auto_auto] max-md:items-center max-md:justify-center max-md:gap-x-2.5 max-md:gap-y-8 md:mb-14 md:grid-cols-[auto_1fr_auto] md:items-start md:justify-normal md:gap-14 lg:gap-16">
          {/* Logo */}
          <div className="max-md:col-start-1 max-md:row-start-1 max-md:justify-self-center md:col-start-1 md:row-start-1 md:justify-self-start">
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
          </div>

          {/* Tagline & Social */}
          <div className="max-md:contents md:col-start-2 md:row-start-1 md:flex md:flex-col md:items-center md:gap-6 md:text-center">
            <p className="font-display mb-0 max-md:col-start-2 max-md:row-start-1 max-md:min-w-0 max-md:text-center max-md:leading-snug text-sm text-cream/80 md:mb-6 md:text-center">
              {tagline}
            </p>
            <div className="flex max-md:col-span-2 max-md:row-start-2 justify-center md:justify-center">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-orange px-5 py-3 font-label text-[11px] tracking-[0.28em] uppercase text-orange transition-colors hover:bg-orange hover:text-coal sm:min-h-0 sm:py-2.5 sm:tracking-[0.3em]"
              >
                Follow {instagramHandle}
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="max-md:col-span-2 max-md:row-start-3 text-center md:col-start-3 md:row-start-1 md:text-right">
            <p className="text-[13px] leading-relaxed text-cream/70">
              <strong className="font-label text-[10px] tracking-[0.3em] uppercase text-orange block mb-2">
                The Analogue Room
              </strong>
              {addressLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="mt-6">
              <a
                href={sisterPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[10px] tracking-[0.3em] uppercase text-orange border-b border-orange/40 pb-0.5 hover:text-cream transition-colors"
              >
                Visit {sisterPropertyName} →
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Outside reveal so deep links (#newsletter) always target a painted anchor */}
      <div
        id="newsletter"
        className="mx-auto mb-12 max-w-md scroll-mt-[9.5rem] border-t border-cream/10 pt-10 md:max-w-lg md:scroll-mt-[10.5rem]"
      >
        <NewsletterSignupForm />
      </div>

      <RevealOnScroll eager className="mx-auto max-w-[1200px]">
        <p className="border-t border-cream/10 pt-6 text-center font-label text-[10px] uppercase tracking-[0.3em] text-cream/40">
          {DEFAULT_COPYRIGHT_LINE}
        </p>
      </RevealOnScroll>
    </footer>
  )
}
