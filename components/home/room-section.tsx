export function RoomSection() {
  return (
    <section className="bg-cream py-30 px-6 md:px-12 relative z-2">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
            The Space
          </p>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] text-coal leading-[1.05] mb-6">
            The Room
          </h2>
          <div className="w-12 h-0.5 bg-orange mb-6" />
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px] mb-6">
            Backlit shelves lined with vinyl. Vintage hi-fi gear humming with warmth. Leather seating, low light, and the crackle of a needle finding its groove.
          </p>
          <p className="font-body text-[15px] font-normal leading-relaxed text-coal/85 max-w-[560px]">
            The Analogue Room is designed to feel like the listening space you always wanted — a place where the music matters and the world outside fades away.
          </p>
        </div>

        {/* Vinyl Visual */}
        <div className="aspect-square relative animate-spin-slow">
          <div
            className="w-full h-full rounded-full shadow-2xl"
            style={{
              background: `
                radial-gradient(circle at center, var(--coal) 0%, var(--coal) 28%, transparent 28.5%),
                radial-gradient(circle at center, transparent 28%, rgba(40,43,46,0.08) 28%, transparent 30%),
                repeating-radial-gradient(circle at center, var(--coal) 30%, var(--coal) calc(30% + 1px), transparent calc(30% + 1px), transparent calc(30% + 4px)),
                var(--orange)
              `,
              boxShadow: '0 30px 60px rgba(40,43,46,0.25), inset 0 0 100px rgba(40,43,46,0.15)',
            }}
          >
            {/* Center label */}
            <div className="absolute inset-[46%] bg-orange rounded-full border border-coal shadow-md" />
            {/* Spindle */}
            <div className="absolute top-[48%] left-[48%] w-[4%] h-[4%] bg-coal rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
