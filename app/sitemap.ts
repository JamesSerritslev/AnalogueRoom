import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH, PRIVACY_PATH } from "@/lib/site-routes"
import { eventPath } from "@/lib/events"
import { OG_IMAGE } from "@/lib/page-metadata"
import { getAllEventSlugs, isEventListed } from "@/lib/sanity/queries"

export const revalidate = 3600

function parseLastMod(iso?: string): Date | undefined {
  if (!iso) return undefined
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const ogImage = `${base}${OG_IMAGE.url}`
  const events = await getAllEventSlugs()
  const eventsUpdatedAt = events
    .map((event) => parseLastMod(event.updatedAt))
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => b.getTime() - a.getTime())[0]

  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
    lastModified?: Date
    images?: string[]
  }[] = [
    {
      path: "/",
      changeFrequency: "weekly",
      priority: 1,
      images: [ogImage],
    },
    {
      path: DRINKS_MENU_PATH,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: FOOD_MENU_PATH,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/events",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: eventsUpdatedAt,
      images: [ogImage],
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/host-event",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: PRIVACY_PATH,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const staticEntries = routes.map(
    ({ path, changeFrequency, priority, lastModified, images }) => ({
      url: `${base}${path === "/" ? "" : path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
      ...(images?.length ? { images } : {}),
    }),
  )

  const eventEntries = events.map((event) => {
    const upcoming = isEventListed(event)
    const recurring = Boolean(event.recurring)
    const images = event.imageUrl ? [event.imageUrl] : undefined
    return {
      url: `${base}${eventPath(event.slug)}`,
      lastModified: parseLastMod(event.updatedAt) ?? parseLastMod(event.date),
      changeFrequency: upcoming || recurring ? ("weekly" as const) : ("yearly" as const),
      priority: upcoming ? 0.7 : recurring ? 0.5 : 0.4,
      ...(images ? { images } : {}),
    }
  })

  return [...staticEntries, ...eventEntries]
}
