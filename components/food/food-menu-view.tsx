import Image from "next/image"
import { MENU_CREAM_SENTINEL_ID } from "@/components/menu/menu-back-to-home-fixed"
import { VenuePhotoImg } from "@/components/venue-photo-img"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const FOOD_MENU_PDF = "/food-menu.pdf"
const FOOD_MENU_IMAGE = "/food-menu.png"

/**
 * Mobile: photo → full-width menu → photo.
 * Desktop: both photos above a height-capped menu.
 */
export function FoodMenuView() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-earth px-4 pb-6 pt-page-hero sm:px-5 sm:pb-8 md:px-6">
      <div
        id={MENU_CREAM_SENTINEL_ID}
        aria-hidden
        className="absolute top-0 right-0 left-0 h-px"
      />

      <div className="mx-auto flex w-full max-w-[960px] flex-1 flex-col items-center gap-4 sm:gap-5 md:gap-6">
        <header className="shrink-0 pt-2 text-center sm:pt-3 md:pt-4">
          <h1 className="font-display text-[clamp(22px,4vw,32px)] leading-[1.05] text-cream">
            Pizza &amp; Salads
          </h1>
          <p className="font-label mt-1 text-[9px] tracking-[0.4em] text-orange uppercase sm:mt-1.5 sm:text-[10px]">
            Pizza &amp; salads in Solvang
          </p>
        </header>

        {/* Mobile */}
        <div className="flex w-full flex-col gap-4 sm:hidden">
          <VenuePhotoImg
            photo={VENUE_PHOTOS.pizzaTray}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
          <Image
            src={FOOD_MENU_IMAGE}
            alt="Pizza and salad menu at The Analogue Room vinyl lounge in Solvang"
            width={1188}
            height={1835}
            priority
            className="h-auto w-full"
            sizes="100vw"
          />
          <VenuePhotoImg
            photo={VENUE_PHOTOS.pizzaWine}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Desktop */}
        <div className="hidden w-full flex-col gap-5 sm:flex md:gap-6">
          <div className="grid w-full grid-cols-2 gap-1">
            <VenuePhotoImg
              photo={VENUE_PHOTOS.pizzaTray}
              priority
              sizes="480px"
              className="h-auto w-full"
            />
            <VenuePhotoImg
              photo={VENUE_PHOTOS.pizzaWine}
              sizes="480px"
              className="h-auto w-full"
            />
          </div>
          <div className="relative mx-auto aspect-[1188/1835] w-full max-h-[min(72vh,820px)] md:max-h-[min(78vh,900px)]">
            <Image
              src={FOOD_MENU_IMAGE}
              alt="Pizza and salad menu at The Analogue Room vinyl lounge in Solvang"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 960px) 100vw, 960px"
            />
          </div>
        </div>

        <a
          href={FOOD_MENU_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label shrink-0 py-1 text-[10px] tracking-[0.28em] text-cream/70 uppercase transition-colors hover:text-orange sm:text-[11px]"
        >
          Open or download menu PDF
        </a>
      </div>
    </div>
  )
}
