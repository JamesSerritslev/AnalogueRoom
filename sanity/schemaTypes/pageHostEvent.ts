import { defineField, defineType } from "sanity"
import { imageField } from "./_imageField"
import { venueStatFields } from "./_venueStatFields"

export const pageHostEventType = defineType({
  name: "pageHostEvent",
  title: "Page · Host your event",
  type: "document",
  description: "Host page intro line and the four venue stat tiles.",
  fields: [
    imageField(
      "heroBackground",
      "Hero background",
      "Full-bleed strip at the top of the Host Your Event page. Empty = falls back to the Home hero image.",
    ),
    defineField({
      name: "introBlurb",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      description: "Under “Your Night, Curated”.",
    }),
    ...venueStatFields,
  ],
  preview: {
    prepare() {
      return { title: "Page · Host your event", subtitle: "Intro · Venue stats" }
    },
  },
})
