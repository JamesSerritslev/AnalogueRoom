import type { ReactNode } from "react"
import {
  DEFAULT_PILLARS,
  DEFAULT_PILLARS_BODY,
  DEFAULT_PILLARS_EYEBROW,
  DEFAULT_PILLARS_HEADLINE,
} from "@/lib/content-defaults"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

/** Splits after the first `. ` (e.g. "Three Words. One Room.") so each phrase is its own line. */
function renderPillarsHeadline(headline: string): ReactNode {
  const splitAt = headline.indexOf(". ")
  if (splitAt <= 0) {
    return renderHeadlineAccent(headline, HOME_HEADLINE_ACCENTS.pillars)
  }
  const line1 = headline.slice(0, splitAt + 1)
  const line2 = headline.slice(splitAt + 2).trimStart()
  return (
    <>
      <span className="block">{line1}</span>
      <span className="block">{renderHeadlineAccent(line2, HOME_HEADLINE_ACCENTS.pillars)}</span>
    </>
  )
}

export async function PillarsSection() {
  const L = await getLayoutSingletons()

  const eyebrow = L.home?.pillarsEyebrow || DEFAULT_PILLARS_EYEBROW
  const headline = L.home?.pillarsHeadline || DEFAULT_PILLARS_HEADLINE
  const body = L.home?.pillarsBody || DEFAULT_PILLARS_BODY
  const pillars =
    L.home?.pillars?.filter((p) => p?.title?.trim())?.length
      ? L.home.pillars
      : DEFAULT_PILLARS

  return (
    <section id="pillars" className="relative z-2 scroll-mt-20 bg-coal px-4 py-20 text-cream sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30">
      <RevealOnScroll className="mx-auto mb-12 max-w-[680px] text-center sm:mb-16 md:mb-20" eager>
        <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] text-cream leading-[1.05] mb-6">
          {renderPillarsHeadline(headline)}
        </h2>
        <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
        <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[560px] mx-auto">
          {body}
        </p>
      </RevealOnScroll>

      {/* Pillars Grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        {pillars.map((pillar, idx) => (
          <RevealOnScroll key={idx} delay={idx * 110}>
            <div className="border border-cream/12 px-4 py-8 text-center motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-1 hover:border-orange hover:bg-orange/4 hover:shadow-lg hover:shadow-black/25 sm:px-6 sm:py-10">
              <p className="font-display text-5xl text-orange/80 leading-none mb-4">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-2xl text-cream mb-3.5">{pillar.title}</h3>
              <div className="w-8 h-px bg-orange mx-auto mb-4" />
              <p className="font-body text-[13px] leading-relaxed text-cream/70">
                {pillar.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
