import Image from "next/image"
import type { SanityImageField } from "@/lib/sanity/types"
import { sanityImageUrl } from "@/lib/sanity/image-url"

type EventFeatureImageProps = {
  image: SanityImageField | undefined
  title?: string
  className?: string
}

function resolveEventImageSrc(image: SanityImageField | undefined): string | undefined {
  if (!image?.asset) return undefined
  const assetId = image.asset._ref || image.asset._id
  const forBuilder: SanityImageField = assetId
    ? { ...image, asset: { ...image.asset, _ref: assetId } }
    : image
  return sanityImageUrl(forBuilder, 1400) ?? image.asset.url
}

/**
 * Renders an event image at its native aspect ratio (wide or tall Instagram-style).
 * Tall shots are width-capped so they don't dominate the page; wide shots fill the column.
 */
export function EventFeatureImage({ image, title, className = "" }: EventFeatureImageProps) {
  const src = resolveEventImageSrc(image)
  if (!src) return null

  const dims = image?.asset?.metadata?.dimensions
  const width = dims?.width && dims.width > 0 ? Math.round(dims.width) : 1080
  const height = dims?.height && dims.height > 0 ? Math.round(dims.height) : 1350
  const portrait = height >= width

  return (
    <figure
      className={`mb-12 overflow-hidden rounded-sm border border-coal/10 bg-coal/5 ${
        portrait ? "mx-auto w-full max-w-[min(100%,420px)] sm:max-w-[480px]" : "w-full"
      } ${className}`}
    >
      <Image
        src={src}
        alt={title ? `Image for ${title}` : "Event image"}
        width={width}
        height={height}
        className="h-auto w-full"
        sizes={
          portrait
            ? "(max-width: 640px) 100vw, 480px"
            : "(max-width: 720px) 100vw, 720px"
        }
        priority
      />
    </figure>
  )
}
