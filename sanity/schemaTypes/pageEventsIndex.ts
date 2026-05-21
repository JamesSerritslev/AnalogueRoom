import { defineField, defineType } from "sanity"

export const pageEventsIndexType = defineType({
  name: "pageEventsIndex",
  title: "Page · Events",
  type: "document",
  description: "Intro copy on the events calendar page. Individual events are separate “Event” entries.",
  fields: [
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
