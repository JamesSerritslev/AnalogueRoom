import { defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

export const pageEventsIndexType = defineType({
  name: "pageEventsIndex",
  title: "Page · Events",
  type: "document",
  description: "Intro copy on the events calendar page. Individual events are separate “Event” entries.",
  fields: [
    imageField(
      "heroBackground",
      "Hero background",
      "Full-bleed strip at the top of the Events calendar page. Empty = falls back to the Home hero image.",
    ),
    defineField({
      name: "introBody",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      description: "Text under “Upcoming Nights”.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page · Events", subtitle: "Calendar intro" }
    },
  },
})
