import { defineArrayMember, defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

export const pageHomeType = defineType({
  name: "pageHome",
  title: "Page · Home",
  type: "document",
  description:
    "Text and images on the home page. Hero headline, location line, and eyebrow are set in code, not here.",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "pillars", title: "Pillars" },
    { name: "room", title: "The Space" },
    { name: "offerings", title: "Offerings" },
    { name: "visit", title: "Visit / Hours" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────
    imageField(
      "heroBackground",
      "Hero background photo",
      "Full-bleed image behind the home hero. Empty = built-in default.",
    ),
    defineField({
      name: "heroLead",
      title: "Hero lead paragraph",
      type: "text",
      rows: 4,
      group: "hero",
      description: "Short paragraph under the headline.",
    }),
    defineField({
      name: "heroMetaHours",
      title: "Meta: hours summary",
      type: "string",
      group: "hero",
      description: "Compact hours shown in the hero footer strip. E.g. \"Thu–Mon · 4pm–10pm\"",
    }),
    defineField({
      name: "heroMetaLocation",
      title: "Meta: location summary",
      type: "string",
      group: "hero",
      description: "Compact address shown in the hero footer strip. E.g. \"1693 Mission Dr, Solvang\"",
    }),

    // ── Pillars ──────────────────────────────────────────────────────────
    defineField({
      name: "pillarsEyebrow",
      title: "Pillars eyebrow",
      type: "string",
      group: "pillars",
    }),
    defineField({
      name: "pillarsHeadline",
      title: "Pillars headline",
      type: "string",
      group: "pillars",
    }),
    defineField({
      name: "pillarsBody",
      title: "Pillars intro paragraph",
      type: "text",
      rows: 3,
      group: "pillars",
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      group: "pillars",
      description: "The three principle cards. Number label is auto-generated from position.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pillar",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (R) => R.max(6),
    }),

    // ── The Space ────────────────────────────────────────────────────────
    imageField(
      "roomSectionImage",
      "The Space: photo (optional)",
      "Replaces the spinning record graphic. Leave empty to keep the record visual.",
    ),
    defineField({
      name: "roomEyebrow",
      title: "Room eyebrow",
      type: "string",
      group: "room",
    }),
    defineField({
      name: "roomHeadline",
      title: "Room headline",
      type: "string",
      group: "room",
    }),
    defineField({
      name: "roomBody",
      title: "Room body paragraphs",
      type: "array",
      group: "room",
      description: "Each entry becomes a separate paragraph.",
      of: [{ type: "string" }],
      validation: (R) => R.max(4),
    }),

    // ── Offerings ────────────────────────────────────────────────────────
    imageField(
      "offeringsBackground",
      "Offerings background photo",
      "Full-width photo behind the drinks & listening section. Empty = built-in default.",
    ),
    defineField({
      name: "offeringsEyebrow",
      title: "Offerings eyebrow",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offeringsHeadline",
      title: "Offerings headline",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offeringsBody",
      title: "Offerings intro paragraph",
      type: "text",
      rows: 3,
      group: "offerings",
    }),
    defineField({
      name: "offeringsWinesTitle",
      title: "Wines card: title",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offeringsWinesDescription",
      title: "Wines card: description",
      type: "text",
      rows: 3,
      group: "offerings",
    }),
    defineField({
      name: "offeringsBeerTitle",
      title: "Beer card: title",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offeringsBeerDescription",
      title: "Beer card: description",
      type: "text",
      rows: 3,
      group: "offerings",
    }),
    defineField({
      name: "offeringsZeroProofTitle",
      title: "Zero Proof card: title",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offeringsZeroProofDescription",
      title: "Zero Proof card: description",
      type: "text",
      rows: 3,
      group: "offerings",
    }),

    // ── Visit / Hours ────────────────────────────────────────────────────
    defineField({
      name: "visitHeadline",
      title: "Visit headline",
      type: "string",
      group: "visit",
    }),
    defineField({
      name: "visitBody",
      title: "Visit intro paragraph",
      type: "text",
      rows: 3,
      group: "visit",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      group: "visit",
      description: "One row per day. \"Closed\" for closed days.",
      of: [
        defineArrayMember({
          type: "object",
          name: "hoursRow",
          fields: [
            defineField({ name: "day", title: "Day", type: "string", validation: (R) => R.required() }),
            defineField({ name: "time", title: "Hours (or \"Closed\")", type: "string", validation: (R) => R.required() }),
            defineField({ name: "closed", title: "Closed?", type: "boolean" }),
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        }),
      ],
      validation: (R) => R.max(7),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page · Home", subtitle: "Hero · Pillars · Room · Offerings · Visit" }
    },
  },
})
