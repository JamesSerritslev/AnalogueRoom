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

const LocationHashScroll = dynamic(
  () =>
    import("@/components/location-hash-scroll").then((m) => m.LocationHashScroll),
  { ssr: false },
)

const OfferingsHashScroll = dynamic(
  () =>
    import("@/components/offerings-hash-scroll").then((m) => m.OfferingsHashScroll),
  { ssr: false },
)

export function HomePageClientScripts() {
  return (
    <>
      <HomeScrollRestore />
      <NewsletterHashScroll />
      <LocationHashScroll />
      <OfferingsHashScroll />
    </>
  )
}
