import type { ReactNode } from "react"

/**
 * Highlights the first exact occurrence of `accent` inside `fullText`.
 * Only the characters in `accent` are tinted (e.g. a trailing "." on the headline
 * stays the default heading color unless it appears inside `accent`).
 */
export function renderHeadlineAccent(fullText: string, accent: string): ReactNode {
  if (!fullText?.trim() || !accent) return fullText
  const i = fullText.indexOf(accent)
  if (i < 0) return fullText
  return (
    <>
      {fullText.slice(0, i)}
      <em className="not-italic text-orange">{accent}</em>
      {fullText.slice(i + accent.length)}
    </>
  )
}
