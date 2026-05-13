import { defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

export const pageHomeType = defineType({
  name: "pageHome",
  title: "Page · Home",
  type: "document",
  description:
    "Home hero, lead line, “The Space” photo, and the “What’s On the Menu” section background.",
  fields: [
    imageField(
      "heroBackground",
      "Home hero background",
      "Full-bleed image behind the home hero. Empty = built-in default photo.",
    ),
    defineField({
      name: "heroLead",
      title: "Hero lead paragraph",
      type: "text",
      rows: 4,
      description: "Short paragraph under the main headline (vinyl / wine bar line).",
    }),
    imageField(
      "roomSectionImage",
      "The Space — photo (optional)",
      "Replaces the spinning record graphic. Leave empty to keep the record visual.",
    ),
    imageField(
      "offeringsBackground",
      "What’s On the Menu — background",
      "Full-width photo behind the drinks & listening section. Empty = built-in default image.",
    ),
  ],
  preview: {
    prepare() {
      return { title: "Page · Home", subtitle: "Hero · Room · Menu section" }
    },
  },
})
