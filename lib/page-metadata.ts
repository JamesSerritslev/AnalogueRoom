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

/** Keep meta descriptions in the 150–160 character window crawlers expect. */
export function clipMetaDescription(text: string, max = 155): string {
  const trimmed = text.replace(/\s+/g, " ").trim()
  if (trimmed.length <= max) return trimmed
  const slice = trimmed.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(" ")
  const clipped = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).replace(
    /[.,;:]+$/,
    "",
  )
  return `${clipped}…`
}

/** Full per-page SEO metadata (title, description, keywords, OG, Twitter, robots). */
export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageSeoInput): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`
  const metaDescription = clipMetaDescription(description)

  return {
    title: { absolute: title },
    description: metaDescription,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: metaDescription,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [OG_IMAGE.url],
    },
    robots: INDEXABLE_ROBOTS,
  }
}
