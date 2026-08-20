import Image from "next/image"
import type { VenuePhoto } from "@/lib/venue-photos"

type VenuePhotoImgProps = {
  photo: VenuePhoto
  className?: string
  sizes?: string
  priority?: boolean
}

const DEFAULT_SIZES = "(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 520px"

/** Renders a venue photo at its native aspect ratio (no crop). */
export function VenuePhotoImg({
  photo,
  className = "h-auto w-full",
  sizes = DEFAULT_SIZES,
  priority = false,
}: VenuePhotoImgProps) {
  return (
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
}
