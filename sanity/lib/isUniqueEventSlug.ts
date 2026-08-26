import type { SlugIsUniqueValidator, ValidationContext } from "sanity"
import { apiVersion } from "../env"

/** Strip draft / version prefixes so a document is not flagged as colliding with itself. */
function canonicalEventId(id: string): string {
  return id.replace(/^drafts\./, "").replace(/^versions\.[^.]+\./, "")
}

function slugString(slug: unknown): string {
  if (typeof slug === "string") return slug.trim()
  if (slug && typeof slug === "object" && "current" in slug) {
    const current = (slug as { current?: unknown }).current
    return typeof current === "string" ? current.trim() : ""
  }
  return ""
}

/**
 * True if no *other* event uses this slug.
 * Same document (draft, published, or a content-release version) is allowed.
 */
export async function eventSlugIsAvailable(
  slug: unknown,
  context: Pick<ValidationContext, "document" | "getClient">,
): Promise<boolean> {
  const value = slugString(slug)
  const documentId = context.document?._id
  if (!value || !documentId) return true

  const client = context.getClient({ apiVersion })
  const selfId = canonicalEventId(documentId)
  const ids = await client.fetch<string[]>(
    `*[_type == "event" && defined(slug.current) && lower(slug.current) == lower($slug)]._id`,
    { slug: value },
  )
  return ids.every((id) => canonicalEventId(id) === selfId)
}

/**
 * True if this event already has a published document.
 * Published slugs are locked, so they must never block later edits.
 */
export async function isExistingPublishedEvent(
  context: Pick<ValidationContext, "document" | "getClient">,
): Promise<boolean> {
  const documentId = context.document?._id
  if (!documentId) return false
  const client = context.getClient({ apiVersion })
  const publishedId = canonicalEventId(documentId)
  return client.fetch<boolean>(`defined(*[_id == $id][0]._id)`, { id: publishedId })
}

export const isUniqueEventSlug: SlugIsUniqueValidator = async (slug, context) => {
  if (await isExistingPublishedEvent(context)) return true
  return eventSlugIsAvailable(slug, context)
}
