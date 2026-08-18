"use client"

import Image from "next/image"
import { MENU_CREAM_SENTINEL_ID } from "@/components/menu/menu-back-to-home-fixed"
import { FOOD_MENU_PDF, FOOD_MENU_PNG } from "@/lib/food-menu"
import type { VenuePhoto } from "@/lib/venue-photos"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const LEFT_PHOTOS = [
  VENUE_PHOTOS.pizzaBoard,
  VENUE_PHOTOS.pizzaProsciutto,
  VENUE_PHOTOS.pizzaSausage,
] as const

const RIGHT_PHOTOS = [
  VENUE_PHOTOS.pizzaCheese,
  VENUE_PHOTOS.pizzaPepperoni,
  VENUE_PHOTOS.pizzaPair,
] as const

const MOBILE_PHOTOS = [
  VENUE_PHOTOS.pizzaBoard,
  VENUE_PHOTOS.pizzaCheese,
  VENUE_PHOTOS.pizzaPepperoni,
  VENUE_PHOTOS.pizzaPair,
  VENUE_PHOTOS.pizzaSausage,
  VENUE_PHOTOS.pizzaProsciutto,
] as const

function MenuPdf({ priority = false }: { priority?: boolean }) {
  return (
    <a
      href={FOOD_MENU_PDF}
      target="_blank"
      rel="noopener noreferrer"
      className="block outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
    >
      <Image
        src={FOOD_MENU_PNG}
        alt="Side Hustle Pizza menu — slices, squares, and salads with prices"
        width={990}
        height={1529}
        sizes="(max-width: 1023px) 100vw, 560px"
        className="h-auto w-full border border-coal/10 shadow-[0_18px_50px_-28px_rgba(28,24,20,0.55)]"
        priority={priority}
        quality={85}
      />
    </a>
  )
}

function PdfLink() {
  return (
    <div className="mt-8 text-center lg:mt-10">
      <a
        href={FOOD_MENU_PDF}
        target="_blank"
        rel="noopener noreferrer"
        className="font-label inline-flex min-h-11 items-center justify-center border border-coal/25 px-6 py-3 text-[11px] tracking-[0.28em] text-coal uppercase transition-colors hover:border-orange hover:text-orange"
      >
        Open or download PDF
      </a>
    </div>
  )
}

/** Fill a flex slot so left/right columns match the menu height. */
function CoverPhoto({
  photo,
  sizes,
  priority = false,
}: {
  photo: VenuePhoto
  sizes: string
  priority?: boolean
}) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        className="object-cover object-center"
      />
    </div>
  )
}

/** Mobile: even 2-column grid after the menu. */
function MobilePizzaCollage() {
  return (
    <div className="mt-14 grid grid-cols-2 gap-3">
      {MOBILE_PHOTOS.map((photo, i) => (
        <div key={photo.src} className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="50vw"
            quality={75}
            priority={i < 2}
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}

/**
 * Food menu page — photo hero + cream body.
 * Desktop: printed menu centered with pizza images flanking it.
 * Mobile: menu first, then an even photo grid.
 */
export function FoodMenuView() {
  return (
    <>
      <section className="relative flex min-h-[48vh] flex-col justify-end overflow-hidden px-4 pb-12 pt-page-hero sm:min-h-[54vh] sm:px-6 sm:pb-14 md:min-h-[58vh] md:px-10 md:pb-16 lg:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={VENUE_PHOTOS.pizzaBoard.src}
            alt={VENUE_PHOTOS.pizzaBoard.alt}
            fill
            priority
            sizes="100vw"
            quality={75}
            className="object-cover object-[center_40%] lg:hidden"
          />
          <Image
            src={VENUE_PHOTOS.pizzaTray.src}
            alt={VENUE_PHOTOS.pizzaTray.alt}
            fill
            priority
            sizes="100vw"
            quality={75}
            className="hidden object-cover object-[center_45%] lg:block"
          />
          <div className="interior-hero-scrim" aria-hidden />
        </div>
        <div className="relative z-2">
          <p className="font-label mb-4 text-[11px] tracking-[0.5em] text-orange uppercase">
            Side Hustle Pizza
          </p>
          <h1 className="font-display mb-3.5 text-[clamp(36px,5.5vw,56px)] leading-[1.05] text-cream">
            Pizza &amp; Salads
          </h1>
          <div className="mt-5 h-0.5 w-15 bg-orange" />
        </div>
      </section>

      <section className="relative bg-cream px-4 py-14 text-coal sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div
          id={MENU_CREAM_SENTINEL_ID}
          aria-hidden
          className="absolute top-0 right-0 left-0 h-px"
        />

        <p className="font-body mx-auto mb-12 max-w-[40rem] text-center text-[15px] leading-relaxed text-coal/80 sm:mb-14 lg:mb-16">
          Pair some music with our great pizza! Made with Baker&apos;s Table focaccia crust
          with locally sourced and house made toppings.
        </p>

        {/* Mobile / tablet: menu first, collage after */}
        <div className="mx-auto max-w-[520px] lg:hidden">
          <MenuPdf priority />
          <PdfLink />
          <MobilePizzaCollage />
        </div>

        {/* Desktop: menu as centerpiece; side columns match menu height */}
        <div className="mx-auto hidden max-w-[1280px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)_minmax(0,1fr)] lg:items-stretch lg:gap-5 xl:gap-6">
          <aside className="flex min-h-0 flex-col gap-3">
            {LEFT_PHOTOS.map((photo, i) => (
              <CoverPhoto
                key={photo.src}
                photo={photo}
                sizes="(max-width: 1280px) 28vw, 340px"
                priority={i === 0}
              />
            ))}
          </aside>

          <div className="z-2">
            <MenuPdf priority />
            <PdfLink />
          </div>

          <aside className="flex min-h-0 flex-col gap-3">
            {RIGHT_PHOTOS.map((photo) => (
              <CoverPhoto
                key={photo.src}
                photo={photo}
                sizes="(max-width: 1280px) 28vw, 340px"
              />
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}
