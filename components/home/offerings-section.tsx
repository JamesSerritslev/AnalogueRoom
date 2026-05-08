export function OfferingsSection() {
  const offerings = [
    {
      title: "Vinyl Library",
      description:
        "A rotating collection of hand-picked records across genres and eras. Classic soul, jazz standards, West Coast rock, ambient explorations, and more.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
          <circle cx="12" cy="12" r="0.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      title: "Wine & Drinks",
      description:
        "A thoughtful selection of wines from Standing Sun and other SYV producers. Craft beers, zero-proof options, and seasonal specials.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M8 2 L16 2 L16 6 C16 8 14.5 9 14 11 L14 21 L10 21 L10 11 C9.5 9 8 8 8 6 Z"/>
          <line x1="10" y1="13" x2="14" y2="13"/>
        </svg>
      ),
    },
    {
      title: "Hi-Fi System",
      description:
        "Premium turntables, tube amplifiers, and warm vintage speakers. Music the way it was meant to be heard.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <rect x="4" y="6" width="16" height="12" rx="1"/>
          <circle cx="8" cy="12" r="2"/>
          <circle cx="16" cy="12" r="2"/>
        </svg>
      ),
    },
    {
      title: "Listening Sessions",
      description:
        "Album deep-dives, genre explorations, and themed nights. Sometimes guided, always immersive.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M3 18v-6a9 9 0 0118 0v6"/>
          <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/>
        </svg>
      ),
    },
    {
      title: "Private Events",
      description:
        "Book the room for birthdays, listening parties, or corporate gatherings. Your night, your playlist.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8Z"/>
        </svg>
      ),
    },
    {
      title: "The Vibe",
      description:
        "Conversation over volume. Connection over content. A space where slowing down is the point.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-earth text-cream py-30 px-6 md:px-12 relative z-2">
      {/* Header */}
      <div className="text-center max-w-[680px] mx-auto mb-16">
        <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
          What We Offer
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] text-cream leading-[1.05] mb-6">
          The Offerings
        </h2>
        <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
        <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[560px] mx-auto">
          Everything at The Analogue Room is designed to deepen the experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {offerings.map((offering) => (
          <div
            key={offering.title}
            className="bg-cream/4 border border-cream/10 px-8 py-10 hover:bg-orange/8 hover:border-orange transition-all duration-300"
          >
            <div className="text-orange mb-6">{offering.icon}</div>
            <h3 className="font-display text-[22px] text-cream mb-3">
              {offering.title}
            </h3>
            <div className="w-6 h-px bg-orange mb-3.5" />
            <p className="font-body text-[13px] leading-relaxed text-cream/70">
              {offering.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
