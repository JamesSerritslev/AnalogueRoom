import Link from "next/link"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import {
  DEFAULT_ADDRESS,
  DEFAULT_HOME_CTA_BODY,
  DEFAULT_HOME_CTA_EYEBROW,
  DEFAULT_HOME_CTA_HEADLINE,
  DEFAULT_SOLVANG_AREA_BODY,
  DEFAULT_SOLVANG_AREA_EYEBROW,
  DEFAULT_SOLVANG_AREA_HEADLINE,
} from "@/lib/content-defaults"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"
import { VENUE_APPLE_MAPS_URL } from "@/lib/venue-location"

export function HomeSolvangAreaSection() {
  const addressLine = DEFAULT_ADDRESS.split("\n").join(", ")

  return (
    <section
      id="solvang-area"
      className="relative z-2 scroll-mt-20 bg-earth px-4 py-20 text-cream sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12"
    >
      <RevealOnScroll className="mx-auto mb-10 max-w-[720px] text-center sm:mb-12" eager>
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          {DEFAULT_SOLVANG_AREA_EYEBROW}
        </p>
        <h2 className="font-display mb-6 text-[clamp(32px,4.5vw,48px)] leading-[1.05] text-cream">
          {renderHeadlineAccent(
            DEFAULT_SOLVANG_AREA_HEADLINE,
            HOME_HEADLINE_ACCENTS.solvangArea,
          )}
        </h2>
        <div className="mx-auto mb-8 h-0.5 w-12 bg-orange" />
        {DEFAULT_SOLVANG_AREA_BODY.map((para, idx) => (
          <p
            key={idx}
            className={`font-body text-[15px] font-normal leading-relaxed text-cream/75 ${
              idx < DEFAULT_SOLVANG_AREA_BODY.length - 1 ? "mb-5" : ""
            }`}
          >
            {para}
          </p>
        ))}
      </RevealOnScroll>

      <RevealOnScroll
        delay={100}
        className="mx-auto mt-14 max-w-[760px] border border-cream/10 bg-cream/4 px-6 py-10 text-center sm:mt-16 sm:px-10 sm:py-12"
      >
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          {DEFAULT_HOME_CTA_EYEBROW}
        </p>
        <h2 className="font-display mb-6 text-[clamp(28px,4vw,42px)] leading-[1.05] text-cream">
          {renderHeadlineAccent(
            DEFAULT_HOME_CTA_HEADLINE,
            HOME_HEADLINE_ACCENTS.homeCta,
          )}
        </h2>
        <div className="mx-auto mb-6 h-0.5 w-12 bg-orange" />
        <p className="font-body mx-auto mb-8 max-w-[560px] text-[15px] leading-relaxed text-cream/75">
          {DEFAULT_HOME_CTA_BODY}
        </p>
        <p className="font-body mb-8 text-[13px] leading-relaxed text-cream/60">
          The Analogue Room ·{" "}
          <a
            href={VENUE_APPLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/80 underline-offset-2 transition-colors hover:text-orange hover:underline"
          >
            {addressLine}
          </a>
          {" · "}
          Open Thu–Sat 4pm–10pm · Sun–Mon 4pm–8pm
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#visit"
            className="inline-flex min-h-11 items-center justify-center bg-orange px-6 py-3 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
          >
            Find Us
          </Link>
          <Link
            href="/host-event"
            className="inline-flex min-h-11 items-center justify-center border border-cream/25 px-6 py-3 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:border-orange hover:text-orange"
          >
            Host Your Event
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  )
}
