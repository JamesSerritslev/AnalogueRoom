import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-coal text-cream py-20 px-6 md:px-12 relative z-2">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-16 items-start mb-14">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="inline-flex shrink-0 rounded-full outline outline-2 outline-orange outline-offset-4"
            >
              <Image
                src="/images/ar-logo.png"
                alt="The Analogue Room"
                width={80}
                height={80}
                className="h-20 w-20 object-contain rounded-full"
              />
            </Link>
          </div>

          {/* Tagline & Social */}
          <div className="text-center">
            <p className="font-display text-sm text-cream/80 mb-6">
              Curation. <em className="not-italic text-orange">Intention.</em> Analogue.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/analogueroomsyv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label text-[11px] tracking-[0.3em] uppercase text-orange border border-orange px-5 py-2.5 hover:bg-orange hover:text-coal transition-colors"
              >
                Follow @analogueroomsyv
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="text-right md:text-right text-center">
            <p className="text-[13px] leading-relaxed text-cream/70">
              <strong className="font-label text-[10px] tracking-[0.3em] uppercase text-orange block mb-2">
                The Analogue Room
              </strong>
              1693 Mission Drive, Ste D2
              <br />
              Solvang, CA 93463
            </p>
            <div className="mt-6">
              <a
                href="https://www.standingsunwines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[10px] tracking-[0.3em] uppercase text-orange border-b border-orange/40 pb-0.5 hover:text-cream transition-colors"
              >
                Visit Standing Sun Wines →
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center font-label text-[10px] tracking-[0.3em] uppercase text-cream/40 border-t border-cream/10 pt-6">
          © 2025 The Analogue Room · Solvang, California
        </p>
      </div>
    </footer>
  )
}
