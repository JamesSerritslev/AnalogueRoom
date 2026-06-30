/**
 * Live preview + revalidation for Presentation / Visual Editing.
 * Must only be imported from React Server Components (defineLive requirement).
 */
import { defineLive } from "next-sanity/live"

import { client } from "./client"

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
  // Presentation Tool handles draft previews; no standalone browser token needed.
  browserToken: false,
})
