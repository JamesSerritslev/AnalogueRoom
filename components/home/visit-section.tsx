import { VisitSectionMap } from "@/components/home/visit-section-map"

export function VisitSection() {
  const hours = [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "Closed", closed: true },
    { day: "Wednesday", time: "4pm – 10pm", closed: false },
    { day: "Thursday", time: "4pm – 10pm", closed: false },
    { day: "Friday", time: "3pm – 11pm", closed: false },
    { day: "Saturday", time: "12pm – 11pm", closed: false },
    { day: "Sunday", time: "12pm – 8pm", closed: false },
  ]

  return (
    <section className="bg-cream py-30 px-6 md:px-12 relative z-2">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Hours */}
        <div className="py-12">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Hours
          </p>
          <h2 className="font-display text-[clamp(34px,4.5vw,52px)] text-coal leading-[1.05] mb-6">
            When We&apos;re <span className="text-orange">Spinning</span>
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px] mb-6">
            Doors open Thursday through Sunday. Come early to grab a corner,
            stay late to find your favorite record on the shelf.
          </p>

          <div className="border-t-2 border-coal">
            {hours.map((item) => (
              <div
                key={item.day}
                className="flex justify-between items-center py-4 border-b border-coal/12"
              >
                <span className="font-label text-[11px] tracking-[0.25em] uppercase text-coal">
                  {item.day}
                </span>
                <span
                  className={`font-display text-sm ${
                    item.closed ? "text-folder-dk italic" : "text-coal"
                  }`}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Info */}
        <div className="bg-coal text-cream p-12 text-left">
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            Visit
          </p>
          <h2 className="font-display text-[32px] text-cream mb-6">
            Stop By.
          </h2>

          <div className="mb-7">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Address
            </p>
            <p className="font-display text-base text-cream leading-normal">
              1693 Mission Drive
              <br />
              Suite D2
              <br />
              Solvang, CA 93463
            </p>
          </div>

          <div className="mb-7">
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Social
            </p>
            <p className="font-display text-base text-cream">
              <a
                href="https://www.instagram.com/analogueroomsyv"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-orange/50 hover:text-orange transition-colors"
              >
                @analogueroomsyv
              </a>
            </p>
          </div>

          <div>
            <p className="font-label text-[9px] tracking-[0.4em] uppercase text-orange mb-2">
              Sister Property
            </p>
            <p className="font-display text-base text-cream">
              <a
                href="https://www.standingsunwines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-orange/50 hover:text-orange transition-colors"
              >
                Standing Sun Wines →
              </a>
            </p>
          </div>
        </div>
      </div>

      <VisitSectionMap />
    </section>
  )
}
