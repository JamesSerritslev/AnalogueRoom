import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const lastModified = new Date()

  const routes: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: DRINKS_MENU_PATH, changeFrequency: "weekly", priority: 0.9 },
    { path: FOOD_MENU_PATH, changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/events", changeFrequency: "weekly", priority: 0.8 },
    { path: "/host-event", changeFrequency: "monthly", priority: 0.7 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
