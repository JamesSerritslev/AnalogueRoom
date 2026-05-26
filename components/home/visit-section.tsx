import { VisitSectionMap } from "@/components/home/visit-section-map"
import {
  DEFAULT_ADDRESS,
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_SISTER_PROPERTY_NAME,
  DEFAULT_SISTER_PROPERTY_URL,
} from "@/lib/content-defaults"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"

export async function VisitSection() {
  const address = DEFAULT_ADDRESS
  const instagramHandle = DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = DEFAULT_INSTAGRAM_URL
  const sisterPropertyName = DEFAULT_SISTER_PROPERTY_NAME
  const sisterPropertyUrl = DEFAULT_SISTER_PROPERTY_URL

  const addressLines = address.split("\n").filter(Boolean)

  return (
    <section id="visit" className="relative z-2 scroll-mt-20 min-w-0 max-w-full bg-cream px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30">
      <div className="mx-auto grid min-w-0 max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Hours */}
        <RevealOnScroll className="py-12">
          <p className="font-label mb-4 text-[10px] tracking-[0.5em] uppercase text-orange">
            Hours
          </p>
          <h2 className="mb-6 font-display text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-coal">
            Coming Soon
          </h2>
          <div className="mb-6 h-0.5 w-12 bg-orange" />
          <p className="max-w-[560px] font-body text-[15px] font-normal leading-relaxed text-coal/85">
            We&apos;ll post days and opening times here as our opening date approaches. Follow us on{" "}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-orange/50 text-orange transition-colors hover:border-orange hover:text-coal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              Instagram
            </a>{" "}
            for announcements.
          </p>
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
            <a
              href={VENUE_APPLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display inline-block text-base text-cream leading-normal transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              {addressLines.map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < addressLines.length - 1 && <br />}
                </span>
              ))}
            </a>
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
