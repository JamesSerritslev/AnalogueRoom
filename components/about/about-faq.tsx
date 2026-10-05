import Link from "next/link"
import type { ReactNode } from "react"
import { DEFAULT_ABOUT_FAQ } from "@/lib/content-defaults"
import { OrderOnlineButton } from "@/components/shared/order-online-button"
import { getSiteUrl } from "@/lib/site-url"

const HOST_EVENT_HREF = "/host-event"
const FAQ_LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

function FaqJsonLd() {
  const pageUrl = `${getSiteUrl()}/about`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DEFAULT_ABOUT_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/** Turn “Host Your Event” mentions into links to /host-event. */
function linkHostEventMentions(text: string): ReactNode {
  const phrase = "Host Your Event"
  const parts = text.split(phrase)
  if (parts.length === 1) return text

  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? (
        <Link href={HOST_EVENT_HREF} className={FAQ_LINK_CLASS}>
          {phrase}
        </Link>
      ) : null}
    </span>
  ))
}

/** About page FAQ — business Q&A + online ordering CTA. */
export function AboutFaq() {
  return (
    <section className="bg-cream px-4 py-20 text-coal sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12">
      <FaqJsonLd />
      <div className="mx-auto max-w-[720px]">
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          Good to Know
        </p>
        <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
          Frequently Asked Questions
        </h2>
        <div className="mb-8 h-px w-8 bg-orange" />
        <p className="font-body mb-8 text-[15px] leading-relaxed text-coal/75">
          Hours, music, food, drinks, online pickup, and hosting — the basics
          about Analogue Room.
        </p>
        <dl className="divide-y divide-coal/12 border-t border-coal/12">
          {DEFAULT_ABOUT_FAQ.map((item) => (
            <div key={item.question} className="py-5">
              <dt className="font-display text-[17px] leading-snug text-coal sm:text-[18px]">
                {item.question}
              </dt>
              <dd className="font-body mt-2 text-[15px] leading-relaxed text-coal/80">
                {linkHostEventMentions(item.answer)}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <OrderOnlineButton />
        </div>
      </div>
    </section>
  )
}
