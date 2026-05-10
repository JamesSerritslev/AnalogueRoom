import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-24 md:px-8 md:py-30">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/interior.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-coal/45 via-coal/65 to-coal/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,130,32,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-2 mx-auto w-full max-w-[880px] pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
        <p className="font-label mb-6 text-[10px] tracking-[0.35em] text-orange drop-shadow-lg sm:mb-8 sm:text-[11px] sm:tracking-[0.45em] md:tracking-[0.5em] uppercase">
          Solvang · California · Est. 2025
        </p>

        <Image
          src="/images/ar-logo.png"
          alt="The Analogue Room"
          width={260}
          height={260}
          className="mx-auto mb-10 w-[min(260px,55vw)] aspect-square object-contain drop-shadow-xl"
          priority
        />

        <h1 className="font-display mb-6 text-[clamp(32px,6vw,58px)] leading-[1.1] text-cream drop-shadow-lg sm:mb-7">
          <span className="block">
            Curation. <em className="not-italic text-orange">Intention.</em>
          </span>
          <span className="block">Analogue.</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3.5 my-8">
          <div className="w-15 h-px bg-cream/40" />
          <span className="text-orange text-sm">★</span>
          <div className="w-15 h-px bg-cream/40" />
        </div>

        <p className="font-body text-sm font-normal leading-relaxed text-cream/85 max-w-[540px] mx-auto mb-10 drop-shadow-md">
          A vinyl bar &amp; record lounge in the heart of Solvang. A rotating selection of local and imported wines, beers, and non-alcoholic options — all paired with the warmth of music played the way it was meant to be heard.
        </p>

        {/* Meta info */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-6 border-t border-cream/20 pt-8 sm:gap-x-10 sm:gap-y-7 md:gap-x-12">
          <div className="text-center">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-1.5">
              Hours
            </p>
            <p className="font-display text-sm text-cream">Thu-Sun · 4-10pm</p>
          </div>
          <div className="text-center">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-1.5">
              Location
            </p>
            <p className="font-display text-sm text-cream">1693 Mission Dr, Solvang</p>
          </div>
          <div className="text-center">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-1.5">
              Follow
            </p>
            <p className="font-display text-sm text-cream">@analogueroomsyv</p>
          </div>
        </div>
      </div>
    </section>
  )
}
