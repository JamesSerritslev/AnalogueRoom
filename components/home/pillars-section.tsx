import {
  DEFAULT_PILLARS,
  DEFAULT_PILLARS_BODY,
  DEFAULT_PILLARS_EYEBROW,
  DEFAULT_PILLARS_HEADLINE,
} from "@/lib/content-defaults"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

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
      {/* Header */}
      <div className="mx-auto mb-12 max-w-[680px] text-center sm:mb-16 md:mb-20">
        <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] text-cream leading-[1.05] mb-6">
          {headline}
        </h2>
        <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
        <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[560px] mx-auto">
          {body}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="border border-cream/12 px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-orange hover:bg-orange/4 sm:px-6 sm:py-10"
          >
            <p className="font-display text-5xl text-orange/80 leading-none mb-4">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-2xl text-cream mb-3.5">
              {pillar.title}
            </h3>
            <div className="w-8 h-px bg-orange mx-auto mb-4" />
            <p className="font-body text-[13px] leading-relaxed text-cream/70">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
