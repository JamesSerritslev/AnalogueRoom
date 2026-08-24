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

export type BodyAccentLink = {
  phrase: string
  /** Custom node for the matched phrase (e.g. maps link). */
  render: (phrase: string) => ReactNode
}

/**
 * Highlights every listed phrase (first occurrence each), non-overlapping.
 * Longer phrases win when they would collide. Optional `links` override accent markup.
 * Text stays crawlable — only presentation changes.
 */
export function renderBodyAccents(
  fullText: string,
  accents: readonly string[],
  links: readonly BodyAccentLink[] = [],
): ReactNode {
  if (!fullText?.trim()) return fullText

  const linkByPhrase = new Map(links.map((l) => [l.phrase, l] as const))
  const phrases = [
    ...new Set([...accents, ...links.map((l) => l.phrase)].filter(Boolean)),
  ].sort((a, b) => b.length - a.length)

  if (!phrases.length) return fullText

  type Hit = { start: number; end: number; text: string }
  const hits: Hit[] = []

  for (const phrase of phrases) {
    const i = fullText.indexOf(phrase)
    if (i < 0) continue
    const end = i + phrase.length
    if (hits.some((h) => i < h.end && end > h.start)) continue
    hits.push({ start: i, end, text: phrase })
  }

  hits.sort((a, b) => a.start - b.start)
  if (!hits.length) return fullText

  const nodes: ReactNode[] = []
  let cursor = 0
  hits.forEach((h, idx) => {
    if (h.start > cursor) nodes.push(fullText.slice(cursor, h.start))
    const link = linkByPhrase.get(h.text)
    nodes.push(
      link ? (
        <span key={`link-${idx}-${h.start}`}>{link.render(h.text)}</span>
      ) : (
        <em key={`accent-${idx}-${h.start}`} className="not-italic text-orange">
          {h.text}
        </em>
      ),
    )
    cursor = h.end
  })
  if (cursor < fullText.length) nodes.push(fullText.slice(cursor))
  return <>{nodes}</>
}
