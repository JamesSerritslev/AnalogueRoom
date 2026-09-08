"use client"

import { useEffect, useState } from "react"
import { Share2 } from "lucide-react"
import { trackEventShare } from "@/lib/analytics"
import { SITE_NAME } from "@/lib/page-metadata"

type EventShareButtonProps = {
  title: string
  dateLine: string
  time?: string
  path: string
  /** Filled orange when this is the only CTA; outline when Tickets sits beside it. */
  variant?: "filled" | "outline"
}

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path
  try {
    return new URL(path, window.location.origin).toString()
  } catch {
    return window.location.href
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const input = document.createElement("textarea")
    input.value = text
    input.setAttribute("readonly", "")
    input.style.position = "fixed"
    input.style.left = "-9999px"
    document.body.appendChild(input)
    input.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(input)
    return ok
  }
}

export function EventShareButton({
  title,
  dateLine,
  time,
  path,
  variant = "filled",
}: EventShareButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(id)
  }, [copied])

  const label = copied ? "Link copied" : "Let people know!"
  const filled = variant === "filled"

  return (
    <button
      type="button"
      onClick={async () => {
        const url = absoluteUrl(path)
        const when = time ? `${dateLine} · ${time}` : dateLine
        const data = {
          title,
          text: `${title} at ${SITE_NAME} — ${when}`,
          url,
        }

        if (typeof navigator.share === "function") {
          try {
            await navigator.share(data)
            trackEventShare(path, "native")
            return
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return
          }
        }

        const ok = await copyToClipboard(url)
        if (ok) {
          setCopied(true)
          trackEventShare(path, "clipboard")
        }
      }}
      className={
        filled
          ? "inline-flex min-h-11 items-center justify-center gap-2 bg-orange px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-cream uppercase transition-colors hover:bg-spanish"
          : "inline-flex min-h-11 items-center justify-center gap-2 border border-coal px-8 py-3.5 font-label text-[11px] tracking-[0.28em] text-coal uppercase transition-colors hover:bg-coal hover:text-cream"
      }
      aria-live="polite"
    >
      <Share2 className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
      {label}
    </button>
  )
}
