import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EventDetail } from "@/components/events/event-detail"
import { EventVenuePhotos } from "@/components/events/event-venue-photos"
import { Footer } from "@/components/layout/footer"
import { eventPath, eventDocumentTitle } from "@/lib/events"
import { clipMetaDescription, SITE_NAME } from "@/lib/page-metadata"
import { getAllEventSlugs, getEventBySlug, getRelatedEvents, isEventListed } from "@/lib/sanity/queries"

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
  const listed = isEventListed(event)
  const title = eventDocumentTitle(event, listed)
  const description = clipMetaDescription(
    event.description ||
      `${event.title} at ${SITE_NAME} in Solvang. Vinyl, wine, beer, and pizza at 1693 Mission Drive.`,
  )

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

  const slug = event.slug?.current?.trim() || decodeURIComponent(rawSlug)
  const relatedEvents = await getRelatedEvents(slug)

  return (
    <>
      <main>
        <EventDetail
          event={event}
          listed={isEventListed(event)}
          relatedEvents={relatedEvents}
        />
        <EventVenuePhotos />
      </main>
      <Footer />
    </>
  )
}
