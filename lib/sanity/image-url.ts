import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export function sanityImageUrl(
  source: SanityImageSource | undefined,
  width?: number
): string | undefined {
  if (!builder || !source) return undefined
  const chain = builder.image(source).fit("max").format("webp")
  return typeof width === "number" ? chain.width(width).url() : chain.url()
}

/** JPEG crop for OG / social cards (Satori is unreliable with webp). */
export function sanityOgImageUrl(
  source: SanityImageSource | undefined,
  width = 1200,
): string | undefined {
  if (!builder || !source) return undefined
  return builder.image(source).fit("crop").format("jpg").quality(85).width(width).url()
}
