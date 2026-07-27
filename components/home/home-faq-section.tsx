import { RevealOnScroll } from "@/components/reveal-on-scroll"
import {
  DEFAULT_HOME_FAQ,
  DEFAULT_HOME_FAQ_EYEBROW,
  DEFAULT_HOME_FAQ_HEADLINE,
} from "@/lib/content-defaults"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"

export function HomeFaqSection() {
  return (
    <section
      id="faq"
      className="relative z-2 scroll-mt-20 bg-cream px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12"
    >
      <RevealOnScroll className="mx-auto mb-12 max-w-[720px] text-center" eager>
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          {DEFAULT_HOME_FAQ_EYEBROW}
        </p>
        <h2 className="font-display mb-6 text-[clamp(32px,4.5vw,48px)] leading-[1.05] text-coal">
          {renderHeadlineAccent(
            DEFAULT_HOME_FAQ_HEADLINE,
            HOME_HEADLINE_ACCENTS.faq,
          )}
        </h2>
        <div className="mx-auto mb-6 h-0.5 w-12 bg-orange" />
      </RevealOnScroll>

      <div className="mx-auto max-w-[760px] space-y-0 border-t-2 border-coal">
        {DEFAULT_HOME_FAQ.map((item) => (
          <RevealOnScroll key={item.question}>
            <div className="border-b border-coal/12 py-6 sm:py-7">
              <h3 className="font-display mb-2.5 text-lg text-coal sm:text-xl">
                {item.question}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-coal/80">
                {item.answer}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
