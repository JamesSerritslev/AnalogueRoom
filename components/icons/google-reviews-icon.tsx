import Image from "next/image"

type GoogleReviewsIconProps = {
  className?: string
}

/** Google “G” + stars review badge. */
export function GoogleReviewsIcon({ className }: GoogleReviewsIconProps) {
  return (
    <Image
      src="/images/google-reviews-icon.png"
      alt="Google Reviews"
      width={48}
      height={48}
      className={`object-contain ${className ?? ""}`.trim()}
    />
  )
}
