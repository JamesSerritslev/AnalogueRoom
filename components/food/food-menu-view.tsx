"use client"

import Image from "next/image"
import Link from "next/link"
import {
  InteriorHeroText,
  MENU_HERO_TITLE_CLASS,
} from "@/components/shared/interior-hero-text"
import { CoverPhotoImg } from "@/components/shared/venue-photo-img"
import { FOOD_MENU_PDF, FOOD_MENU_PNG } from "@/lib/food-menu"
import { RevealImage } from "@/components/shared/reveal-image"
import { DRINKS_MENU_PATH } from "@/lib/site-routes"
import type { VenuePhoto } from "@/lib/venue-photos"
import { VENUE_PHOTOS } from "@/lib/venue-photos"

const FOOD_SEO_LINK =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

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
    <RevealImage className="relative min-h-0 flex-1 overflow-hidden">
      <CoverPhotoImg photo={photo} sizes={sizes} priority={priority} />
    </RevealImage>
  )
}

/** Mobile: even 2-column grid after the menu. */
function MobilePizzaCollage() {
  return (
    <div className="mt-14 grid grid-cols-2 gap-3">
      {MOBILE_PHOTOS.map((photo, i) => (
        <RevealImage key={photo.src} className="relative aspect-[4/5] overflow-hidden">
            <CoverPhotoImg photo={photo} sizes="50vw" priority={i < 2} />
        </RevealImage>
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
          <CoverPhotoImg
            photo={VENUE_PHOTOS.pizzaBoard}
            priority
            sizes="100vw"
            className="object-[center_40%] lg:hidden"
          />
          <CoverPhotoImg
            photo={VENUE_PHOTOS.pizzaTray}
            priority
            sizes="100vw"
            className="hidden object-[center_45%] lg:block"
          />
          <div className="interior-hero-scrim" aria-hidden />
        </div>
        <InteriorHeroText eyebrow="Side Hustle Pizza" titleClassName={MENU_HERO_TITLE_CLASS}>
          Pizza &amp; Salads
        </InteriorHeroText>
      </section>

      <section className="relative bg-cream px-4 py-14 text-coal sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto mb-12 max-w-[40rem] text-center sm:mb-14 lg:mb-16">
          <h2 className="font-display mb-4 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
            Side Hustle Pizza
          </h2>
          <div className="mx-auto mb-5 h-px w-8 bg-orange" />
          <p className="font-body text-[15px] leading-relaxed text-coal/80">
            Pair some music with our great pizza. Baker&apos;s Table focaccia crust,
            locally sourced toppings, and house-made salads meant for drinks and
            vinyl—not a full restaurant meal.
          </p>
        </div>

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

      <section className="bg-cream px-4 pb-16 text-coal sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:px-12">
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
            Give it a try!
          </h2>
          <div className="mb-5 h-px w-8 bg-orange" />
          <div className="font-body space-y-4 text-[15px] leading-relaxed text-coal/85">
            <p>
              Side Hustle Pizza at Analogue Room offers focaccia bread pizzas, plus
              simple salads. We&apos;re open later than most restaurants, so if
              you&apos;re looking for a late night bite after a day in the Santa
              Ynez Valley, come stop by!
            </p>
            <p>
              The printed menu above lists our full food menu. Open the PDF if you
              want to zoom or save it for later. Order a 6&quot; × 8&quot; cut in two to
              split with a friend, or a 12&quot; × 8&quot; for a group.
            </p>
            <p>
              Pair a slice with a drink from our{" "}
              <Link href={DRINKS_MENU_PATH} className={FOOD_SEO_LINK}>
                wine and beer menu
              </Link>
              , or see what&apos;s spinning on the{" "}
              <Link href="/events" className={FOOD_SEO_LINK}>
                events calendar
              </Link>
              . We&apos;re at 1693 Mission Drive, Suite D2, in Founder&apos;s
              Square, Solvang. Thursday through Saturday 4pm to 10pm; Sunday and
              Monday 4pm to 8pm.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
