import Image from "next/image"
import type { VenuePhoto } from "@/lib/venue-photos"
import { RevealImage } from "@/components/shared/reveal-image"

type VenuePhotoImgProps = {
  photo: VenuePhoto
  className?: string
  sizes?: string
  priority?: boolean
  /** Scroll fade. Off in lightboxes so the open photo is not delayed. */
  reveal?: boolean
}

const DEFAULT_SIZES = "(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 520px"

/** Renders a venue photo at its native aspect ratio (no crop). */
export function VenuePhotoImg({
  photo,
  className = "h-auto w-full",
  sizes = DEFAULT_SIZES,
  priority = false,
  reveal = true,
}: VenuePhotoImgProps) {
  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      className={className}
      priority={priority}
      quality={75}
    />
  )

  if (!reveal) return image

  return <RevealImage className="w-full">{image}</RevealImage>
}

/** Cover-fit photo with explicit width/height so crawlers see dimensions. */
export function CoverPhotoImg({
  photo,
  className = "",
  sizes = DEFAULT_SIZES,
  priority = false,
  quality = 75,
}: VenuePhotoImgProps & { quality?: number }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
    />
  )
}
