import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { getEventBySlug } from "@/lib/sanity/queries"

export const revalidate = 60

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(decodeURIComponent(slug))
  if (!event) {
    return { title: "Event · Analogue Room" }
  }
  return {
    title: `${event.title} · Analogue Room`,
    description: event.description,
    alternates: {
      canonical: `/events#${encodeURIComponent(event.slug?.current ?? slug)}`,
    },
  }
}

/** Legacy detail URLs → inline events calendar anchors. */
export default async function EventDetailRedirect({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const event = await getEventBySlug(slug)
  if (!event) notFound()
  const anchor = event.slug?.current?.trim() || slug
  permanentRedirect(`/events#${encodeURIComponent(anchor)}`)
}
