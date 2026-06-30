"use client"

import dynamic from "next/dynamic"

const HomeScrollRestore = dynamic(
  () =>
    import("@/components/home/home-scroll-restore").then((m) => m.HomeScrollRestore),
  { ssr: false },
)

const NewsletterHashScroll = dynamic(
  () =>
    import("@/components/newsletter-hash-scroll").then((m) => m.NewsletterHashScroll),
  { ssr: false },
)

export function HomePageClientScripts() {
  return (
    <>
      <HomeScrollRestore />
      <NewsletterHashScroll />
    </>
  )
}
