import Image from "next/image"
import {
  DEFAULT_ROOM_BODY,
  DEFAULT_ROOM_EYEBROW,
  DEFAULT_ROOM_HEADLINE,
} from "@/lib/content-defaults"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { HOME_HEADLINE_ACCENTS } from "@/lib/home-headline-accents"
import { renderHeadlineAccent } from "@/lib/render-headline-accent"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"

export async function RoomSection() {
  const [{ roomTheSpaceUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const eyebrow = L.home?.roomEyebrow || DEFAULT_ROOM_EYEBROW
  const headline = L.home?.roomHeadline || DEFAULT_ROOM_HEADLINE
  const bodyParagraphs =
    L.home?.roomBody?.filter((p) => p?.trim())?.length
      ? L.home.roomBody
      : DEFAULT_ROOM_BODY

  return (
    <section id="room" className="relative z-2 scroll-mt-20 bg-cream px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-30">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Text */}
        <RevealOnScroll>
          <div>
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] text-coal leading-[1.05] mb-6">
            {renderHeadlineAccent(headline, HOME_HEADLINE_ACCENTS.room)}
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />
          {bodyParagraphs.map((para, idx) => (
            <p
              key={idx}
              className={`font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px]${idx < bodyParagraphs.length - 1 ? " mb-6" : ""}`}
            >
              {para}
            </p>
          ))}
        </div>
        </RevealOnScroll>

        {/* Photo from Sanity, or default vinyl visual */}
        <RevealOnScroll delay={140}>
        {roomTheSpaceUrl ? (
          <div className="group relative aspect-square w-full max-w-[min(100%,420px)] mx-auto md:mx-0 md:justify-self-end overflow-hidden rounded-sm border border-coal/10 shadow-xl shadow-coal/15">
            <Image
              src={roomTheSpaceUrl}
              alt="The Analogue Room"
              fill
              className="object-cover motion-safe:transition-transform motion-safe:duration-[1.05s] motion-safe:ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
        ) : (
          <div className="aspect-square relative animate-spin-slow">
            <div
              className="w-full h-full rounded-full shadow-2xl"
              style={{
                background: `
                radial-gradient(circle at center, var(--coal) 0%, var(--coal) 28%, transparent 28.5%),
                radial-gradient(circle at center, transparent 28%, rgba(40,43,46,0.08) 28%, transparent 30%),
                repeating-radial-gradient(circle at center, var(--coal) 30%, var(--coal) calc(30% + 1px), transparent calc(30% + 1px), transparent calc(30% + 4px)),
                var(--orange)
              `,
                boxShadow:
                  "0 30px 60px rgba(40,43,46,0.25), inset 0 0 100px rgba(40,43,46,0.15)",
              }}
            >
              <div className="absolute inset-[46%] bg-orange rounded-full border border-coal shadow-md" />
              <div className="absolute top-[48%] left-[48%] w-[4%] h-[4%] bg-coal rounded-full" />
            </div>
          </div>
        )}
        </RevealOnScroll>
      </div>
    </section>
  )
}
