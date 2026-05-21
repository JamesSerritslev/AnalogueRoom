import { VisitSectionMap } from "@/components/home/visit-section-map"
import {
  DEFAULT_ADDRESS,
  DEFAULT_HOURS,
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_SISTER_PROPERTY_NAME,
  DEFAULT_SISTER_PROPERTY_URL,
  DEFAULT_VISIT_BODY,
  DEFAULT_VISIT_HEADLINE,
} from "@/lib/content-defaults"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

export async function VisitSection() {
  const L = await getLayoutSingletons()

  const headline = L.home?.visitHeadline || DEFAULT_VISIT_HEADLINE
  const body = L.home?.visitBody || DEFAULT_VISIT_BODY
  const hours =
    L.home?.hours?.filter((h) => h?.day?.trim())?.length
      ? L.home.hours
      : DEFAULT_HOURS

  const address = L.brand?.address || DEFAULT_ADDRESS
  const instagramHandle = L.brand?.instagramHandle || DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = L.brand?.instagramUrl || DEFAULT_INSTAGRAM_URL
  const sisterPropertyName = L.brand?.sisterPropertyName || DEFAULT_SISTER_PROPERTY_NAME
  const sisterPropertyUrl = L.brand?.sisterPropertyUrl || DEFAULT_SISTER_PROPERTY_URL

  const addressLines = address.split("\n").filter(Boolean)

  return (
    <section id="visit" className="relative z-2 scroll-mt-20 min-w-0 max-w-full bg-cream px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30">
      <div className="mx-auto grid min-w-0 max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Hours */}
        <RevealOnScroll className="py-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Hours
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            {renderHeadlineAccent(headline, HOME_HEADLINE_ACCENTS.visit)}
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px] mb-6">
            {body}
          </p>

          <div className="border-t-2 border-coal">
            {hours.map((item, idx) => (
              <div
                key={`${item.day}-${idx}`}
                className="flex items-start justify-between gap-3 border-b border-coal/12 py-3.5 sm:items-center sm:py-4"
              >
                <span className="shrink-0 font-label text-[10px] tracking-[0.2em] text-coal uppercase sm:text-[11px] sm:tracking-[0.25em]">
                  {item.day}
                </span>
                <span
                  className={`min-w-0 text-right font-display text-xs sm:text-sm ${
                    item.closed ? "text-folder-dk italic" : "text-coal"
                  }`}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Visit Info */}
        <RevealOnScroll delay={120}>
        <div className="bg-coal p-6 text-cream text-left sm:p-8 md:p-10 lg:p-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Visit
          </p>
          <h2 className="font-display text-[32px] text-cream mb-6">
            Stop By.
          </h2>

          <div className="mb-7">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Address
            </p>
            <p className="font-display text-base text-cream leading-normal">
              {addressLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="mb-7">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Social
            </p>
            <p className="font-display text-base text-cream">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-orange/50 hover:text-orange transition-colors"
              >
                {instagramHandle}
              </a>
            </p>
          </div>

          <div>
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Sister Property
            </p>
            <p className="font-display text-base text-cream">
              <a
                href={sisterPropertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-orange/50 hover:text-orange transition-colors"
              >
                {sisterPropertyName} →
              </a>
            </p>
          </div>
        </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={180} eager className="w-full">
        <VisitSectionMap />
      </RevealOnScroll>
    </section>
  )
}
