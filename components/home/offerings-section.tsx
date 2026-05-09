export function OfferingsSection() {
  const offerings = [
    {
      title: "Wines",
      description:
        "A rotating selection of local Santa Barbara County labels alongside imported pours from regions worth knowing. Curated for the moment, the music, and the mood.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M8 2 L16 2 L16 6 C16 8 14.5 9 14 11 L14 21 L10 21 L10 11 C9.5 9 8 8 8 6 Z"/>
          <line x1="10" y1="13" x2="14" y2="13"/>
        </svg>
      ),
    },
    {
      title: "Beer",
      description:
        "A thoughtful list of craft beers, both local and from further afield. Cold, fresh, and chosen to complement everything from a quiet evening to a packed Friday night.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M7 7h7a2 2 0 012 2v8a3 3 0 01-3 3H8a3 3 0 01-3-3V9a2 2 0 012-2z" />
          <path d="M16 10h2a2 2 0 010 4h-2" />
          <line x1="8.5" y1="4" x2="8.5" y2="7" />
          <line x1="11" y1="4" x2="11" y2="7" />
          <line x1="13.5" y1="4" x2="13.5" y2="7" />
        </svg>
      ),
    },
    {
      title: "Zero Proof",
      description:
        "A genuine, considered non-alcoholic menu. Sodas, mocktails, alcohol-free wines and beers — because the experience matters more than the alcohol.",
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M7.5 3h9l-1.2 5.8c-.3 1.3-1.4 2.2-2.7 2.2h-1.2c-1.3 0-2.4-.9-2.7-2.2L7.5 3Z" />
          <path d="M9 11v6.5a3.5 3.5 0 0 0 7 0V11" />
          <line x1="6" y1="21" x2="18" y2="21" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-earth text-cream py-30 px-6 md:px-12 relative z-2">
      {/* Header */}
      <div className="text-center max-w-[680px] mx-auto mb-16">
        <p className="font-label text-[10px] tracking-[0.5em] uppercase text-orange mb-4">
          Drinks & Listening
        </p>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] text-cream leading-[1.05] mb-6">
          What&apos;s <span className="text-orange">On the Menu</span>
        </h2>
        <div className="w-12 h-0.5 bg-orange mx-auto mb-6" />
        <p className="font-body text-[15px] font-normal leading-relaxed text-cream/70 max-w-[560px] mx-auto">
          A rotating menu, always evolving. Local where we can, imported where it makes sense, and never anything we wouldn&apos;t pour for ourselves.
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
