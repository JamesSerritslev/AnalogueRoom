"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { Wine, MapPin, ExternalLink } from "lucide-react"
import { scrollToAnchorById } from "@/lib/anchor-scroll"
import { smoothScrollToY } from "@/lib/smooth-scroll"
import {
  VENUE_STREET_ADDRESS,
  VENUE_ADDRESS_LOCALITY,
  VENUE_ADDRESS_REGION,
  VENUE_POSTAL_CODE,
  getVenuePhoneDisplay,
  getVenuePhoneTelHref,
} from "@/lib/venue-location"
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_HERO_META_HOURS,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_ORDER_ONLINE_URL,
} from "@/lib/content-defaults"
import { OpenInMapsLink } from "@/components/shared/open-in-maps-link"
import {
  TrackedFacebookLink,
  TrackedInstagramLink,
  TrackedTelLink,
} from "@/components/shared/tracked-links"
import { FacebookIcon } from "@/components/icons/facebook-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"

import { HomeTodayEventCta } from "@/components/home/home-today-event-cta"
import { DRINKS_MENU_PATH, FOOD_MENU_PATH } from "@/lib/site-routes"
import type { Event } from "@/lib/sanity/types"

const JOIN_LIST_HREF = "/#newsletter"
const OFFERINGS_HREF = "/#offerings"
const LOCATION_HREF = "/#location"
const HOST_EVENT_HREF = "/host-event"

const navLinks = [
  { href: "/", label: "Home" },
  { href: DRINKS_MENU_PATH, label: "Drinks" },
  { href: FOOD_MENU_PATH, label: "Food" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
]

const NAV_CTA_OUTLINE_CLASS =
  "font-label text-[11px] tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.24em] uppercase motion-safe:transition-colors motion-safe:duration-300 inline-flex min-h-10 shrink-0 items-center justify-center border border-coal bg-transparent px-3 py-2 text-coal hover:bg-coal hover:text-cream sm:px-3.5"

const NAV_MOBILE_CTA_OUTLINE_CLASS =
  "rounded-sm border border-coal bg-transparent px-3 py-2 text-center font-label text-[11px] leading-snug tracking-[0.2em] text-coal uppercase transition-colors hover:bg-coal hover:text-cream active:bg-coal sm:py-2.5 sm:tracking-[0.24em]"

const NAV_MOBILE_LINK_CLASS =
  "rounded-sm px-3 py-2 font-label text-[11px] tracking-[0.22em] uppercase transition-colors sm:py-2.5 sm:text-[12px] sm:tracking-[0.25em]"

const NAV_LINK_CLASS =
  "font-label text-[11px] tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.3em] uppercase motion-safe:transition-[color,transform,border-color] motion-safe:duration-300 motion-safe:ease-out"

const NAV_MOBILE_ICON_CLASS =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center text-coal transition-colors hover:text-orange active:opacity-70"

const DEFAULT_LOGO_SRC = "/images/ar-logo.png"

type NavigationProps = {
  logoSrc?: string
  /** Compact hours line for mobile menu (e.g. hero meta hours). */
  hoursLine?: string
  /** Shown under the bar on the home page when a one-off night is listed. */
  homeEvent?: Event | null
  /** Optional bar flush under the nav (home one-off event CTA). */
  children?: ReactNode
}

export function Navigation({
  logoSrc = DEFAULT_LOGO_SRC,
  hoursLine = DEFAULT_HERO_META_HOURS,
  homeEvent = null,
  children,
}: NavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [eventCtaExpanded, setEventCtaExpanded] = useState(false)
  const [mobilePanelTop, setMobilePanelTop] = useState(0)
  const eventCtaExpandedRef = useRef(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const phoneDisplay = getVenuePhoneDisplay()
  const phoneTel = getVenuePhoneTelHref()
  const eventCta =
    pathname === "/" && homeEvent ? <HomeTodayEventCta event={homeEvent} /> : children
  const hasCta = Boolean(eventCta)

  function goHomeAnchor(
    anchorId: string,
    href: string,
    scrollOptions?: Parameters<typeof scrollToAnchorById>[1],
  ) {
    setMenuOpen(false)
    setNavHidden(false)
    if (pathname === "/") {
      scrollToAnchorById(anchorId, scrollOptions)
      if (typeof window !== "undefined" && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", href)
      }
      return
    }
    router.push(href)
  }

  /** Home + `/#newsletter`: Next often skips scrolling when pathname is unchanged */
  function handleJoinListClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    goHomeAnchor("newsletter", JOIN_LIST_HREF)
  }

  function handleOfferingsClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    // Land a bit further into the section so the drink cards sit more in view.
    goHomeAnchor("offerings", OFFERINGS_HREF, { extraOffsetPx: -140 })
  }

  function handleLocationClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setMenuOpen(false)
    setNavHidden(false)
    if (pathname === "/") {
      scrollToAnchorById("location", { extraOffsetPx: -80 })
      if (typeof window !== "undefined" && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", LOCATION_HREF)
      }
      return
    }
    router.push(LOCATION_HREF)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) setNavHidden(false)
  }, [menuOpen])

  // Hide the floating Order Online FAB while the mobile drawer is open.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ar-mobile-nav", { detail: { open: menuOpen } }),
    )
    return () => {
      window.dispatchEvent(
        new CustomEvent("ar-mobile-nav", { detail: { open: false } }),
      )
    }
  }, [menuOpen])

  useEffect(() => {
    const onEventCta = (e: Event) => {
      const expanded = Boolean((e as CustomEvent<{ expanded?: boolean }>).detail?.expanded)
      eventCtaExpandedRef.current = expanded
      setEventCtaExpanded(expanded)
      if (expanded) setNavHidden(false)
    }
    window.addEventListener("ar-event-cta-expanded", onEventCta)
    return () => window.removeEventListener("ar-event-cta-expanded", onEventCta)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastScrollY.current

      if (y <= 16) {
        setNavHidden(false)
      } else if (diff > 10) {
        // Keep nav + event CTA visible while the large CTA is open.
        if (!eventCtaExpandedRef.current) setNavHidden(true)
      } else if (diff < -10) {
        setNavHidden(false)
      }

      lastScrollY.current = y
    }

    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscroll: body.style.overscrollBehavior,
    }

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"
    body.style.overscrollBehavior = "none"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)

    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.position = prev.bodyPosition
      body.style.top = prev.bodyTop
      body.style.width = prev.bodyWidth
      body.style.overscrollBehavior = prev.bodyOverscroll
      window.removeEventListener("keydown", onKey)
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  // Keep the slide-over flush under the real nav (+ event bar) height.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const update = () => {
      setMobilePanelTop(Math.round(el.getBoundingClientRect().bottom))
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [eventCtaExpanded, hasCta, menuOpen, navHidden])

  return (
    <>
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] motion-safe:transition-transform motion-safe:duration-300 ${
          navHidden && !eventCtaExpanded ? "-translate-y-full" : "translate-y-0"
        } ${
          hasCta && !eventCtaExpanded
            ? "max-lg:bg-cream/92 max-lg:backdrop-blur-md"
            : ""
        }`}
      >
      <nav
        className={`flex items-center justify-between gap-2 bg-cream/92 px-4 py-2 backdrop-blur-md sm:gap-3 sm:px-6 sm:py-3 md:px-10 lg:py-4 ${
          hasCta
            ? `border-b border-coal ${
                eventCtaExpanded
                  ? ""
                  : "max-lg:bg-transparent max-lg:backdrop-blur-none"
              }`
            : "border-b border-coal/8"
        } pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-[max(0.75rem,env(safe-area-inset-top))]`}
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
                smoothScrollToY(
                  0,
                  typeof window !== "undefined" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                )
              }
            }}
          >
            <Image
              src={logoSrc}
              alt="Analogue Room logo"
              width={60}
              height={60}
              className="h-9 w-9 object-contain sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px]"
            />
          </Link>
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
            <Link href={HOST_EVENT_HREF} className={NAV_CTA_OUTLINE_CLASS}>
              Host Your Event
            </Link>
            <a
              href={JOIN_LIST_HREF}
              onClick={handleJoinListClick}
              className={NAV_CTA_OUTLINE_CLASS}
            >
              Join our List
            </a>
          </li>
          <li className="flex shrink-0 items-center gap-2">
            <TrackedInstagramLink
              href={DEFAULT_INSTAGRAM_URL}
              placement="nav_desktop"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              <InstagramIcon className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </TrackedInstagramLink>
            <TrackedFacebookLink
              href={DEFAULT_FACEBOOK_URL}
              placement="nav_desktop"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              <FacebookIcon className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </TrackedFacebookLink>
          </li>
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <div className="mr-1.5 flex items-center gap-1.5 sm:mr-2 sm:gap-2">
            <a
              href={OFFERINGS_HREF}
              onClick={handleOfferingsClick}
              className={NAV_MOBILE_ICON_CLASS}
              aria-label="Drinks and food on the home page"
            >
              <Wine className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </a>
            <button
              type="button"
              onClick={handleLocationClick}
              className={NAV_MOBILE_ICON_CLASS}
              aria-label="View map and location"
            >
              <MapPin className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <button
            type="button"
            className="relative z-[120] inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-sm border border-coal/15 text-coal sm:min-h-11 sm:min-w-11"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
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
        </div>
      </nav>
      {eventCta}
      </div>

      {/* Mobile / small tablet: slide-over menu (below fixed nav so hamburger stays clickable) */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] lg:hidden"
        style={{ top: mobilePanelTop }}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`pointer-events-auto absolute inset-0 bg-coal/45 transition-opacity duration-200 ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <div
          id="site-mobile-nav"
          className={`pointer-events-auto absolute inset-y-0 right-0 z-[95] flex w-[min(100%,20rem)] flex-col overflow-hidden border-l border-coal/10 bg-cream shadow-xl transition-transform duration-200 ease-out ${
            menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
          style={{
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="shrink-0 border-b border-coal/10 px-5 py-2.5 sm:py-3">
            <p className="font-label text-[9px] tracking-[0.35em] uppercase text-orange">Menu</p>
          </div>
          <nav
            className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-2 sm:py-3"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${NAV_MOBILE_LINK_CLASS} ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"))
                    ? "bg-orange/12 text-orange"
                    : "text-coal active:bg-coal/8"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DEFAULT_ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${NAV_MOBILE_LINK_CLASS} text-coal active:bg-coal/8`}
            >
              Order Online
            </a>
            <a
              href="https://www.standingsunwines.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${NAV_MOBILE_LINK_CLASS} text-spanish-dk active:bg-coal/8`}
            >
              Standing Sun Wines
            </a>
            <Link href={HOST_EVENT_HREF} className={NAV_MOBILE_CTA_OUTLINE_CLASS}>
              Host Your Event
            </Link>
            <Link
              href={JOIN_LIST_HREF}
              onClick={handleJoinListClick}
              className={NAV_MOBILE_CTA_OUTLINE_CLASS}
            >
              Join our List
            </Link>
          </nav>

          <div className="flex shrink-0 flex-col items-center border-t border-coal/10 px-4 py-3 text-center sm:px-5 sm:py-4">
            <p className="font-label text-[9px] tracking-[0.28em] text-orange uppercase">
              Hours
            </p>
            <p className="mt-1 font-body text-[12px] leading-snug text-coal/85 sm:text-[13px]">
              {hoursLine}
            </p>
            <p className="font-label mt-3 text-[9px] tracking-[0.28em] text-orange uppercase">
              Address
            </p>
            <p className="mt-1 font-body text-[12px] leading-snug text-coal/85 sm:text-[13px]">
              {VENUE_STREET_ADDRESS}
              <br />
              {VENUE_ADDRESS_LOCALITY}, {VENUE_ADDRESS_REGION} {VENUE_POSTAL_CODE}
            </p>
            {phoneDisplay && phoneTel ? (
              <>
                <p className="font-label mt-3 text-[9px] tracking-[0.28em] text-orange uppercase">
                  Phone
                </p>
                <TrackedTelLink
                  href={phoneTel}
                  placement="nav_mobile"
                  className="mt-1 inline-flex min-h-9 items-center justify-center font-body text-[12px] text-coal/85 transition-colors hover:text-orange sm:text-[13px]"
                >
                  {phoneDisplay}
                </TrackedTelLink>
              </>
            ) : null}
            <p className="font-label mt-3 text-[9px] tracking-[0.28em] text-orange uppercase">
              Follow
            </p>
            <div className="mt-1 flex items-center justify-center gap-3">
              <TrackedInstagramLink
                href={DEFAULT_INSTAGRAM_URL}
                placement="nav_mobile"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <InstagramIcon className="h-7 w-7" />
                <span className="sr-only">Instagram</span>
              </TrackedInstagramLink>
              <TrackedFacebookLink
                href={DEFAULT_FACEBOOK_URL}
                placement="nav_mobile"
                className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <FacebookIcon className="h-7 w-7" />
                <span className="sr-only">Facebook</span>
              </TrackedFacebookLink>
            </div>
            <OpenInMapsLink
              placement="mobile_nav"
              provider="google"
              className="mt-3 inline-flex min-h-9 items-center justify-center gap-1.5 border border-orange/40 px-3.5 py-2 font-label text-[10px] tracking-[0.2em] text-orange uppercase transition-colors hover:bg-orange/10 active:bg-orange/15"
            >
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            </OpenInMapsLink>
          </div>
        </div>
      </div>
    </>
  )
}
