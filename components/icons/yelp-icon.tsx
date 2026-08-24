import Image from "next/image"

type YelpIconProps = {
  className?: string
}

/** Official Yelp burst mark. */
export function YelpIcon({ className }: YelpIconProps) {
  return (
    <Image
      src="/images/yelp-burst.png"
      alt=""
      width={32}
      height={40}
      className={`object-contain ${className ?? ""}`.trim()}
      aria-hidden
    />
  )
}
