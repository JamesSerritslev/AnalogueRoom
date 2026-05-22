"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { scrollToAnchorById } from "@/lib/anchor-scroll"

const JOIN_LIST_HREF = "/#newsletter"
const HOST_EVENT_HREF = "/host-event"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
]

const NAV_CTA_OUTLINE_CLASS =
  "font-label text-[11px] tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] uppercase motion-safe:transition-colors motion-safe:duration-300 inline-flex min-h-10 shrink-0 items-center justify-center border border-coal/20 bg-transparent px-3 py-2 text-coal hover:border-orange hover:text-orange sm:px-3.5"

const NAV_MOBILE_CTA_OUTLINE_CLASS =
  "rounded-sm border border-orange/35 bg-transparent px-3 py-3.5 text-center font-label text-[11px] leading-snug tracking-[0.22em] text-orange uppercase transition-colors hover:bg-orange/10 active:bg-orange/15 sm:tracking-[0.24em]"

const NAV_LINK_CLASS =
  "font-label text-[11px] tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.3em] uppercase motion-safe:transition-[color,transform,border-color] motion-safe:duration-300 motion-safe:ease-out"

const DEFAULT_LOGO_SRC = "/images/ar-logo.png"

type NavigationProps = {
  logoSrc?: string
  /** When false (set `NEXT_PUBLIC_COMING_SOON=false`), hides the Coming Soon pill. Defaults true. */
  showComingSoonLabel?: boolean
}

export function Navigation({
  logoSrc = DEFAULT_LOGO_SRC,
  showComingSoonLabel = true,
}: NavigationProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  /** Home + `/#newsletter`: Next often skips scrolling when pathname is unchanged */
  function handleJoinListClick(e: React.MouseEvent<HTMLAnchorElement>) {
    setMenuOpen(false)
    if (pathname !== "/") return
    if (typeof document === "undefined") return
    if (!document.getElementById("newsletter")) return
    e.preventDefault()
    scrollToAnchorById("newsletter")
    if (typeof window !== "undefined" && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", "/#newsletter")
    }
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-3 border-b border-coal/8 bg-cream/92 px-4 py-3 backdrop-blur-md sm:px-6 md:px-10 lg:px-12 lg:py-4"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <Link
            href="/"
            className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:opacity-90 motion-safe:active:scale-[0.98] z-50 flex shrink-0 items-center"
            onClick={(e) => {
              setMenuOpen(false)
              // Already on home: SPA won't navigate; scroll & clear fragment so hero is at top.
              if (pathname === "/") {
                e.preventDefault()
                if (
                  typeof window !== "undefined" &&
                  typeof window.history.replaceState === "function"
                ) {
                  const next = `${window.location.pathname}${window.location.search}`
                  window.history.replaceState(null, "", next || "/")
                }
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior:
                    typeof window !== "undefined" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                      ? "auto"
                      : "smooth",
                })
              }
            }}
          >
            <Image
              src={logoSrc}
              alt="The Analogue Room"
              width={60}
              height={60}
              className="h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px]"
              priority
            />
          </Link>
          {showComingSoonLabel ? (
            <span
              className="font-label whitespace-nowrap border border-orange/40 bg-orange/10 px-2 py-1 text-[8px] leading-tight tracking-[0.28em] text-orange uppercase sm:px-2.5 sm:text-[9px] sm:tracking-[0.3em]"
            >
              Coming Soon
            </span>
          ) : null}
        </div>

        <ul className="hidden min-w-0 flex-1 items-center justify-end gap-2 xl:gap-4 2xl:gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${NAV_LINK_CLASS} inline-flex min-h-10 items-center border-b pb-0.5 motion-safe:hover:-translate-y-px ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"))
                    ? "border-orange text-orange"
                    : "border-transparent text-coal hover:text-orange"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://www.standingsunwines.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${NAV_LINK_CLASS} inline-flex min-h-10 items-center border-b border-spanish-dk/40 pb-0.5 text-spanish-dk hover:text-orange`}
            >
              Standing Sun Wines
            </a>
          </li>
          <li className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <a
              href={JOIN_LIST_HREF}
              onClick={handleJoinListClick}
              className={NAV_CTA_OUTLINE_CLASS}
            >
              Join our List
            </a>
            <Link href={HOST_EVENT_HREF} className={NAV_CTA_OUTLINE_CLASS}>
              Host Your Event
            </Link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/analogueroomsyv"
              target="_blank"
              rel="noopener noreferrer"
              className={`${NAV_LINK_CLASS} inline-flex min-h-10 items-center bg-orange px-4 py-2.5 text-cream shadow-sm shadow-coal/10 motion-safe:transition-colors motion-safe:duration-300 hover:bg-spanish hover:shadow-md sm:px-5`}
            >
              Instagram
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm border border-coal/15 text-coal lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile / small tablet: slide-over menu */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-coal/45 transition-opacity duration-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: "max(5.25rem, calc(3.5rem + env(safe-area-inset-top)))" }}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <div
          id="site-mobile-nav"
          className={`absolute bottom-0 right-0 z-[95] flex w-[min(100%,20rem)] flex-col border-l border-coal/10 bg-cream shadow-xl transition-transform duration-200 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            top: "max(5.25rem, calc(3.5rem + env(safe-area-inset-top)))",
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="border-b border-coal/10 px-5 py-4">
            <p className="font-label text-[9px] tracking-[0.35em] uppercase text-orange">Menu</p>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-3.5 font-label text-[12px] tracking-[0.25em] uppercase transition-colors ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"))
                    ? "bg-orange/12 text-orange"
                    : "text-coal active:bg-coal/8"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.standingsunwines.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm px-3 py-3.5 font-label text-[12px] tracking-[0.25em] uppercase text-spanish-dk active:bg-coal/8"
            >
              Standing Sun Wines
            </a>
            <Link
              href={JOIN_LIST_HREF}
              onClick={handleJoinListClick}
              className={NAV_MOBILE_CTA_OUTLINE_CLASS}
            >
              Join our List
            </Link>
            <Link href={HOST_EVENT_HREF} className={NAV_MOBILE_CTA_OUTLINE_CLASS}>
              Host Your Event
            </Link>
            <a
              href="https://www.instagram.com/analogueroomsyv"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 mt-2 inline-flex min-h-11 items-center justify-center bg-orange px-4 py-3 font-label text-[11px] tracking-[0.28em] uppercase text-cream"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
