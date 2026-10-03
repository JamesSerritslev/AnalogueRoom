"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"
import { eventPath } from "@/lib/events"
import { homeEventWhenPrefix } from "@/lib/event-recurrence"
import { sanityImageUrl } from "@/lib/sanity/image-url"
import type { Event } from "@/lib/sanity/types"

export function HomeTodayEventCta({ event }: { event: Event }) {
  const slug = event.slug?.current?.trim()
  if (!slug || !event.title?.trim() || !event.date) return null

  return <HomeTodayEventCtaInner event={event} slug={slug} />
}

function HomeTodayEventCtaInner({
  event,
  slug,
}: {
  event: Event
  slug: string
}) {
  const [expanded, setExpanded] = useState(false)
  const autoHideTimerRef = useRef<number | undefined>(undefined)
  /** Timed intro is showing — ignore scroll-minimize and keep nav pinned. */
  const introActiveRef = useRef(false)
  const when = homeEventWhenPrefix(event.date!)
  const time = event.time?.trim()
  const title = event.title.trim()
  const flyerUrl = sanityImageUrl(event.image, 900)
  const flyerDims = event.image?.asset?.metadata?.dimensions
  const flyerWidth =
    flyerDims?.width && flyerDims.width > 0 ? Math.round(flyerDims.width) : 1080
  const flyerHeight =
    flyerDims?.height && flyerDims.height > 0 ? Math.round(flyerDims.height) : 1350

  const clearAutoHide = useCallback(() => {
    if (autoHideTimerRef.current !== undefined) {
      window.clearTimeout(autoHideTimerRef.current)
      autoHideTimerRef.current = undefined
    }
  }, [])

  const minimize = useCallback(() => {
    introActiveRef.current = false
    clearAutoHide()
    setExpanded(false)
  }, [clearAutoHide])

  const expand = useCallback(() => {
    introActiveRef.current = false
    clearAutoHide()
    setExpanded(true)
  }, [clearAutoHide])

  // Keep the site nav pinned while the large CTA is open (nav also hides on scroll).
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ar-event-cta-expanded", { detail: { expanded } }),
    )
    return () => {
      window.dispatchEvent(
        new CustomEvent("ar-event-cta-expanded", { detail: { expanded: false } }),
      )
    }
  }, [expanded])

  // Every page load / mount: wait 2s, show for 5s, then auto-hide.
  // Runs even if the user is already scrolling down the page.
  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      introActiveRef.current = true
      setExpanded(true)
      autoHideTimerRef.current = window.setTimeout(() => {
        autoHideTimerRef.current = undefined
        introActiveRef.current = false
        setExpanded(false)
      }, 5000)
    }, 2000)

    return () => {
      window.clearTimeout(showTimer)
      introActiveRef.current = false
      clearAutoHide()
    }
  }, [clearAutoHide])

  // Manual expand: scroll down minimizes. Timed intro: stay open through scrolling.
  useEffect(() => {
    if (!expanded) return

    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (introActiveRef.current) {
        lastY = y
        return
      }
      if (y > lastY && y > 24) {
        minimize()
      }
      lastY = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [expanded, minimize])

  return (
    <div className="relative border-b border-coal/8">
      {/* Large format — see-through */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`flex flex-col bg-cream/50 backdrop-blur-md transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
              expanded ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex flex-1 items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 md:gap-8 md:px-10">
              {flyerUrl ? (
                <div className="shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={flyerUrl}
                    alt={`${title} flyer`}
                    width={flyerWidth}
                    height={flyerHeight}
                    className="h-auto max-h-[min(62vh,520px)] w-auto max-w-[40vw] object-contain sm:max-w-[240px] md:max-w-[280px]"
                    sizes="(max-width: 640px) 40vw, 280px"
                    priority
                  />
                </div>
              ) : null}
              <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2 sm:gap-3">
                <p className="font-label text-[10px] tracking-[0.35em] text-coal uppercase sm:text-[11px]">
                  {when}
                  {time ? ` · ${time}` : null}
                </p>
                <p className="font-display max-w-[36rem] text-[clamp(20px,3.8vw,32px)] leading-[1.1] text-coal">
                  {title}
                </p>
                <Link
                  href={eventPath(slug)}
                  tabIndex={expanded ? 0 : -1}
                  className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border-2 border-coal bg-coal px-5 font-display text-[13px] leading-none tracking-[0.04em] text-cream transition-colors hover:bg-orange hover:border-orange sm:min-h-12 sm:px-6 sm:text-[14px]"
                >
                  <span className="block translate-y-[0.08em]">See more here! ›</span>
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={minimize}
              tabIndex={expanded ? 0 : -1}
              aria-label="Minimize event announcement"
              className="mx-auto mb-1 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-coal transition-colors hover:bg-coal/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:mb-1.5"
            >
              <ChevronUp className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Minimized bar — solid */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${
          expanded ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
        aria-hidden={expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`relative flex min-h-8 items-center justify-center gap-2 bg-cream px-3 py-1 transition-[opacity,background-color] duration-500 ease-in-out hover:bg-cream motion-reduce:transition-none sm:min-h-9 sm:gap-3 sm:px-6 md:px-10 ${
              expanded ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <button
              type="button"
              onClick={expand}
              tabIndex={expanded ? -1 : 0}
              aria-label={`Expand event announcement: ${title}`}
              className="absolute inset-0 z-0 cursor-pointer"
            />
            <p className="pointer-events-none relative z-10 min-w-0 truncate font-display text-[11px] tracking-[0.04em] text-coal sm:text-[12px] sm:tracking-[0.06em]">
              {when}: {title}
              {time ? ` · ${time}` : null}
            </p>
            <Link
              href={eventPath(slug)}
              tabIndex={expanded ? -1 : 0}
              className="relative z-10 inline-flex h-6 shrink-0 items-center justify-center rounded-full border border-coal px-3 font-display text-[10px] leading-none tracking-[0.06em] text-coal transition-colors hover:bg-coal hover:text-cream sm:h-7 sm:px-3.5 sm:text-[11px]"
            >
              <span className="block translate-y-[0.08em]">See more here! ›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
