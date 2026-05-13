import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
  // No standalone draft previews needed — Presentation Tool handles that.
  // Setting false silences the "no browserToken" console warning.
  browserToken: false,
});
