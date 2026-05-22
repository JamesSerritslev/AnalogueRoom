/**
 * Sanity Studio mounted at `/studio` (see `app/studio/[[...index]]/page.tsx`).
 * https://www.sanity.io/docs/api-versioning
 */

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { defineLocations, presentationTool } from "sanity/presentation"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"

// NEXT_PUBLIC_VERCEL_URL is injected automatically by Vercel on every deployment.
// NEXT_PUBLIC_SITE_URL is the canonical override (set this in Vercel env vars for production).
const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000")

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        locations: {
          /** Site-wide brand / identity; every page shows it */
          siteBrand: defineLocations({
            select: {},
            resolve: () => ({
              locations: [
                { title: "Home", href: "/" },
                { title: "About", href: "/about" },
                { title: "Events", href: "/events" },
                { title: "Menu", href: "/menu" },
                { title: "Host Your Event", href: "/host-event" },
              ],
            }),
          }),

          /** Home page content */
          pageHome: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Home", href: "/" }],
            }),
          }),

          /** About page */
          pageAbout: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "About", href: "/about" }],
            }),
          }),

          /** Events index page */
          pageEventsIndex: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Events", href: "/events" }],
            }),
          }),

          /** Host Your Event page */
          pageHostEvent: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Host Your Event", href: "/host-event" }],
            }),
          }),

          /** Menus (drinks); full-page menu */
          pageMenus: defineLocations({
            select: {},
            resolve: () => ({
              locations: [{ title: "Menu", href: "/menu" }],
            }),
          }),

          /** Individual event documents */
          event: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                { title: "Events", href: "/events" },
                ...(doc?.slug
                  ? [{ title: doc.title ?? "Event", href: `/events/${doc.slug}` }]
                  : []),
              ],
            }),
          }),
        },
      },
    }),
    // GROQ playground: uses same apiVersion as `sanity/env.ts` (invalid dates break Fetch)
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: dataset,
    }),
  ],
})
