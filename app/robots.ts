import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/draft-mode/"],
      },
      // Explicit allows so favicon checkers / Googlebot-Image never misread disallow rules.
      {
        userAgent: "Googlebot",
        allow: ["/", "/favicon.ico", "/favicon-48x48.png", "/favicon-96x96.png", "/icon-192.png"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/favicon.ico", "/favicon-48x48.png", "/favicon-96x96.png", "/icon-192.png"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
