import Image from "next/image"
import { MENU_CREAM_SENTINEL_ID } from "@/components/menu/menu-back-to-home-fixed"

const FOOD_MENU_PDF = "/food-menu.pdf"
const FOOD_MENU_IMAGE = "/food-menu.png"

/**
 * Displays the printed food menu as large as possible
 * within the viewport on mobile and desktop.
 */
export function FoodMenuView() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-earth px-2 pb-3 pt-page-hero sm:px-4 sm:pb-4 md:px-6">
      <div
        id={MENU_CREAM_SENTINEL_ID}
        aria-hidden
        className="absolute top-0 right-0 left-0 h-px"
      />

      <div className="mx-auto flex min-h-0 w-full max-w-[960px] flex-1 flex-col items-center gap-2 sm:gap-3">
        <header className="shrink-0 pt-2 text-center sm:pt-3 md:pt-4">
          <h1 className="font-display text-[clamp(22px,4vw,32px)] leading-[1.05] text-cream">
            Pizza &amp; Salads
          </h1>
          <p className="font-label mt-1 text-[9px] tracking-[0.4em] text-orange uppercase sm:mt-1.5 sm:text-[10px]">
            Pizza &amp; salads in Solvang
          </p>
        </header>

        <div className="relative min-h-0 w-full flex-1">
          <Image
            src={FOOD_MENU_IMAGE}
            alt="Pizza and salad menu at The Analogue Room vinyl lounge in Solvang"
            fill
            priority
            className="object-contain object-center"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        </div>

        <a
          href={FOOD_MENU_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label shrink-0 py-1 text-[10px] tracking-[0.28em] text-cream/70 uppercase transition-colors hover:text-orange sm:text-[11px]"
        >
          Open or download PDF
        </a>
      </div>
    </div>
  )
}
