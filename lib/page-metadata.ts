import type { Metadata } from "next"

export const SITE_NAME = "The Analogue Room"

export const OG_IMAGE = {
  url: "/images/og.png",
  width: 1024,
  height: 492,
  type: "image/png" as const,
  alt: "The Analogue Room: minimalist illustration of analog audio equipment with the ANALOGUE ROOM wordmark",
} as const

const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
} as const

type PageSeoInput = {
  title: string
  description: string
  keywords: string[]
  path: string
}

/** Full per-page SEO metadata (title, description, keywords, OG, Twitter, robots). */
export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageSeoInput): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    robots: INDEXABLE_ROBOTS,
  }
}
