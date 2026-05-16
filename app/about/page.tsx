import type { Metadata } from "next"
import Image from "next/image"
import { SiteNavigation } from "@/components/site-navigation"
import { Footer } from "@/components/footer"
import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { sanityImageUrl } from "@/lib/sanity/image-url"
import {
  DEFAULT_ABOUT_STORY_PARAGRAPHS,
  DEFAULT_TEAM_INTRO,
  DEFAULT_TEAM_MEMBERS,
} from "@/lib/content-defaults"

export const metadata: Metadata = {
  title: "About | The Analogue Room",
  description: "The story of The Analogue Room - a curated vinyl bar and listening lounge in Solvang, California.",
}

export const revalidate = 60

export default async function AboutPage() {
  const [{ innerPageHeroUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])

  const storyParagraphs =
    L.about?.storyParagraphs?.filter((p) => p?.trim())?.length ?? 0
      ? (L.about!.storyParagraphs!.filter((p) => p?.trim()) as string[])
      : [...DEFAULT_ABOUT_STORY_PARAGRAPHS]

  const splitIdx = storyParagraphs.length >= 5 ? 3 : storyParagraphs.length
  const storyBeforeQuote = storyParagraphs.slice(0, splitIdx)
  const storyAfterQuote = storyParagraphs.slice(splitIdx)

  const teamMembers =
    L.about?.teamMembers?.filter((m) => m?.name?.trim())?.length ?? 0
      ? L.about!.teamMembers!.filter((m) => m?.name?.trim())!
      : DEFAULT_TEAM_MEMBERS

  const teamIntro = L.about?.teamIntro?.trim() || DEFAULT_TEAM_INTRO

  return (
    <>
      <SiteNavigation />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[50vh] items-end overflow-hidden px-4 pb-14 pt-page-hero sm:min-h-[55vh] sm:px-6 sm:pb-16 md:px-10 md:pb-[4.5rem] lg:px-12">
          <div
            className="interior-hero-photo interior-hero-drift absolute inset-0 z-0"
            style={{ backgroundImage: `url('${innerPageHeroUrl}')` }}
          >
            <div className="interior-hero-scrim" aria-hidden />
          </div>
          <div className="relative z-2">
            <p className="font-label text-[11px] tracking-[0.5em] uppercase text-orange mb-4">
              Solvang · California
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] text-cream leading-[1.05] mb-3.5">
              Our <em className="not-italic text-orange">Story</em>
            </h1>
            <div className="w-15 h-0.5 bg-orange mt-5" />
          </div>
        </section>

        {/* Story Section */}
        <section className="mx-auto max-w-[920px] px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            The Analogue Room
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            A Room Worth <em className="not-italic text-orange">Sitting In</em>
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />

          <div className="font-body text-base leading-relaxed text-coal/85 mb-6">
            {storyBeforeQuote.map((text, i) => (
              <p key={`story-a-${i}`} className={i < storyBeforeQuote.length - 1 ? "mb-4" : ""}>
                {text}
              </p>
            ))}
          </div>

          <blockquote className="font-display text-[clamp(22px,3vw,30px)] text-orange leading-snug my-12 py-8 border-t-2 border-b-2 border-coal text-center">
            &ldquo;Curation. Intention. Analogue.&rdquo;
          </blockquote>

          {storyAfterQuote.length > 0 ? (
            <div className="font-body text-base leading-relaxed text-coal/85">
              {storyAfterQuote.map((text, i) => (
                <p key={`story-b-${i}`} className={i < storyAfterQuote.length - 1 ? "mb-4" : ""}>
                  {text}
                </p>
              ))}
            </div>
          ) : null}
        </section>

        {/* Team Section */}
        <section className="bg-coal px-4 py-20 text-cream sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
              The People
            </p>
            <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-cream leading-[1.05] mb-6">
              Behind the <em className="not-italic text-orange">Room</em>
            </h2>
            <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
            <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70">
              {teamIntro}
            </p>
          </div>

          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {teamMembers.map((member, idx) => {
              const photoUrl = sanityImageUrl(member.photo, 560)
              const name = member.name ?? "Team member"
              return (
              <div
                key={`${member.name ?? "member"}-${idx}`}
                className="border border-cream/10 bg-cream/4 px-6 py-8 text-center transition-all duration-300 hover:border-orange hover:bg-orange/6 sm:px-8 sm:py-9 md:px-9 md:py-10"
              >
                <div
                  className={`relative mx-auto mb-6 h-35 w-35 overflow-hidden rounded-full ${
                    photoUrl
                      ? "border border-cream/10"
                      : "border border-dashed border-cream/20 bg-cream/5"
                  }`}
                >
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        className="text-cream/30"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="font-label text-[10px] tracking-[0.4em] uppercase text-orange mb-2">
                  {member.role}
                </p>
                <h3 className="font-display text-2xl text-cream">{member.name}</h3>
                {member.bio ? (
                  <p className="font-body text-[13px] leading-relaxed text-cream/60 mt-3">
                    {member.bio}
                  </p>
                ) : null}
              </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
