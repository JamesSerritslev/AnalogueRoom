import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EventDetail } from "@/components/events/event-detail"
import { EventVenuePhotos } from "@/components/events/event-venue-photos"
import { Footer } from "@/components/layout/footer"
import { eventPath } from "@/lib/events"
import { SITE_NAME } from "@/lib/page-metadata"
import { getAllEventSlugs, getEventBySlug } from "@/lib/sanity/queries"

export const revalidate = 60
export const dynamicParams = true

type PageProps = { params: Promise<{ slug: string }> }

async function loadEvent(rawSlug: string) {
  return getEventBySlug(decodeURIComponent(rawSlug))
}

export async function generateStaticParams() {
  const entries = await getAllEventSlugs()
  return entries.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const event = await loadEvent(rawSlug)
  if (!event) {
    return { title: "Event · Analogue Room" }
  }

  const slug = event.slug?.current?.trim() || decodeURIComponent(rawSlug)
  const path = eventPath(slug)
  const title = `${event.title} · Analogue Room`
  const description = event.description || `An event at ${SITE_NAME} in Solvang.`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const event = await loadEvent(rawSlug)
  if (!event) notFound()

  return (
    <>
      <main>
        <EventDetail event={event} />
        <EventVenuePhotos />
      </main>
      <Footer />
    </>
  )
}
