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
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import type { HoursRow } from "@/lib/sanity/types"
import { VENUE_APPLE_MAPS_URL, getVenuePhoneDisplay, getVenuePhoneTelHref } from "@/lib/venue-location"

function VisitHeadline({ text }: { text: string }) {
  const accent = "Spinning"
  if (text.endsWith(accent)) {
    return (
      <>
        {text.slice(0, -accent.length)}
        <span className="text-orange">{accent}</span>
      </>
    )
  }
  return text
}

export async function VisitSection() {
  const L = await getLayoutSingletons()
  const address = DEFAULT_ADDRESS
  const instagramHandle = DEFAULT_INSTAGRAM_HANDLE
  const instagramUrl = DEFAULT_INSTAGRAM_URL
  const sisterPropertyName = DEFAULT_SISTER_PROPERTY_NAME
  const sisterPropertyUrl = DEFAULT_SISTER_PROPERTY_URL
  const visitHeadline = L.home?.visitHeadline || DEFAULT_VISIT_HEADLINE
  const visitBody = L.home?.visitBody || DEFAULT_VISIT_BODY
  const hours: HoursRow[] =
    L.home?.hours && L.home.hours.length > 0 ? L.home.hours : DEFAULT_HOURS

  const addressLines = address.split("\n").filter(Boolean)
  const phoneDisplay = getVenuePhoneDisplay()
  const phoneTel = getVenuePhoneTelHref()

  return (
    <section id="visit" className="relative z-2 scroll-mt-20 min-w-0 max-w-full bg-cream px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12 md:px-10 md:pt-28 md:pb-14 lg:px-12 lg:pt-30 lg:pb-14">
      <div className="mx-auto grid min-w-0 max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Hours */}
        <RevealOnScroll className="py-12">
          <p className="font-label mb-4 text-[10px] tracking-[0.5em] uppercase text-orange">
            Hours
          </p>
          <h2 className="mb-6 font-display text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-coal">
            <VisitHeadline text={visitHeadline} />
          </h2>
          <div className="mb-6 h-0.5 w-12 bg-orange" />
          <p className="mb-6 max-w-[560px] font-body text-[15px] font-normal leading-relaxed text-coal/85">
            {visitBody}
          </p>

          <div className="border-t-2 border-coal">
            {hours.map((item) => (
              <div
                key={item.day}
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

          {phoneDisplay && phoneTel ? (
            <div className="mb-7">
              <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
                Phone
              </p>
              <a
                href={phoneTel}
                className="font-display inline-block text-base text-cream leading-normal transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                {phoneDisplay}
              </a>
            </div>
          ) : null}

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
