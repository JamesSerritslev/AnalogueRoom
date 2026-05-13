import { createClient } from "next-sanity"
import { draftMode } from "next/headers"

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-01-01"
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio"
const previewToken = process.env.SANITY_API_READ_TOKEN?.trim() || process.env.SANITY_API_TOKEN?.trim()

/** Only constructed when a project id exists — avoids next-sanity throwing at import time during builds without env. */
export const client =
  projectId.length > 0
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: process.env.NODE_ENV === "production",
        stega: {
          studioUrl,
        },
      })
    : null

/**
 * For Presentation / Visual Editing:
 * - draftMode ON => fetch draft perspective with token and source maps (stega)
 * - draftMode OFF => normal published perspective
 */
export async function getClientForRequest() {
  if (!client) return null

  const { isEnabled } = await draftMode()
  if (!isEnabled || !previewToken) return client

  return client.withConfig({
    token: previewToken,
    useCdn: false,
    perspective: "previewDrafts",
    stega: {
      enabled: true,
      studioUrl,
    },
  })
}
