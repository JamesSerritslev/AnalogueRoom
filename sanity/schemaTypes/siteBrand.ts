import { defineType } from "sanity"
import { imageField } from "./_imageField"

/** Global brand assets (not tied to a single page route). */
export const siteBrandType = defineType({
  name: "siteBrand",
  title: "Site · Brand",
  type: "document",
  description: "Logo and the shared hero photo behind About, Events, and Host Your Event.",
  fields: [
    imageField(
      "logo",
      "Logo",
      "Nav, footer, and home hero. Square PNG or JPG works best.",
    ),
    imageField(
      "innerHero",
      "Inner pages hero background",
      "Full-bleed strip on About, Events list, each Event page, and Host Your Event. Empty = falls back to Home hero image.",
    ),
  ],
  preview: {
    prepare() {
      return { title: "Site · Brand", subtitle: "Logo · Inner hero" }
    },
  },
})
