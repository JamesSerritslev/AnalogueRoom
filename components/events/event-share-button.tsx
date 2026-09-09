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
}: EventShareButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2500)
    return () => window.clearTimeout(id)
  }, [copied])

  const label = copied ? "Link copied" : "Let people know"

  return (
    <button
      type="button"
      onClick={async () => {
        const url = absoluteUrl(path)
        const when = time ? `${dateLine} · ${time}` : dateLine
        const data = {
          title,
          text: `${title} at ${SITE_NAME}, ${when}`,
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
      className="font-label inline-flex min-h-10 items-center justify-center gap-2 border border-coal/20 px-4 py-2 text-[10px] tracking-[0.2em] text-coal uppercase transition-colors hover:border-orange hover:text-orange"
      aria-live="polite"
    >
      <Share2 className="h-3 w-3" strokeWidth={2.25} aria-hidden />
      {label}
    </button>
  )
}
