"use client"

export function HeroScrollDown() {
  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 transition-colors duration-300 hover:text-orange group"
      aria-label="Scroll to content"
    >
      <span className="font-label text-[8px] tracking-[0.45em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore
      </span>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}
