import type { Metadata } from "next"
import Image from "next/image"
import { AboutStory } from "@/components/about/about-story"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { Footer } from "@/components/layout/footer"
import { getSiteImagery, resolvePageHeroUrl } from "@/lib/sanity/site-imagery"
import { getLayoutSingletons } from "@/lib/sanity/layout-singletons"
import { sanityImageUrl } from "@/lib/sanity/image-url"
import {
  DEFAULT_ABOUT_STORY_PARAGRAPHS,
  DEFAULT_TEAM_INTRO,
  DEFAULT_TEAM_MEMBERS,
} from "@/lib/content-defaults"
import { buildPageMetadata } from "@/lib/page-metadata"

export const metadata: Metadata = buildPageMetadata({
  title: "About · Analogue Room",
  description:
    "The story of The Analogue Room: a vinyl lounge and wine bar in Solvang, built for listening, pouring, and slow nights out.",
  keywords: [
    "analogue room",
    "analogue room owner",
    "wine",
    "wine bar",
    "best pizza",
    "best music",
  ],
  path: "/about",
})

export const revalidate = 60

export default async function AboutPage() {
  const [{ homeHeroUrl }, L] = await Promise.all([
    getSiteImagery(),
    getLayoutSingletons(),
  ])
  const pageHeroUrl = resolvePageHeroUrl(L.about?.heroBackground, homeHeroUrl)

  const storyParagraphs = [...DEFAULT_ABOUT_STORY_PARAGRAPHS]

  const teamMembers =
    L.about?.teamMembers?.filter((m) => m?.name?.trim())?.length ?? 0
      ? L.about!.teamMembers!.filter((m) => m?.name?.trim())!
      : DEFAULT_TEAM_MEMBERS

  const teamIntro = L.about?.teamIntro?.trim() || DEFAULT_TEAM_INTRO

  return (
    <>
      <SiteNavigation />
      <main>
        <section className="relative flex min-h-[50vh] items-end overflow-hidden px-4 pb-14 pt-page-hero sm:min-h-[55vh] sm:px-6 sm:pb-16 md:px-10 md:pb-[4.5rem] lg:px-12">
          <div
            className="interior-hero-photo interior-hero-drift absolute inset-0 z-0"
            style={{ backgroundImage: `url('${pageHeroUrl}')` }}
          >
            <div className="interior-hero-scrim" aria-hidden />
          </div>
          <div className="relative z-2">
            <p className="font-label mb-4 text-[11px] tracking-[0.5em] text-orange uppercase">
              Solvang · California
            </p>
            <h1 className="font-display mb-3.5 text-[clamp(40px,6vw,72px)] leading-[1.05] text-cream">
              Our <em className="not-italic text-orange">Story</em>
            </h1>
            <div className="mt-5 h-0.5 w-15 bg-orange" />
          </div>
        </section>

        <AboutStory paragraphs={storyParagraphs} />

        <section className="bg-coal px-4 py-20 text-cream sm:px-6 sm:py-24 md:px-10 md:py-28 lg:px-12">
          <div className="mx-auto mb-16 max-w-[680px] text-center">
            <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
              The People
            </p>
            <h2 className="font-display mb-6 text-[clamp(34px,4.5vw,52px)] leading-[1.05] text-cream">
              Behind the <em className="not-italic text-orange">Room</em>
            </h2>
            <div className="mx-auto mb-6 h-0.5 w-12 bg-orange" />
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
                  <p className="font-label mb-2 text-[10px] tracking-[0.4em] text-orange uppercase">
                    {member.role}
                  </p>
                  <h3 className="font-display text-2xl text-cream">{member.name}</h3>
                  {member.bio ? (
                    <p className="font-body mt-3 text-[13px] leading-relaxed text-cream/60">
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
