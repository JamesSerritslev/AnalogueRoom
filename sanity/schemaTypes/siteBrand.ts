import { defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

/** Global brand assets and site-wide copy. */
export const siteBrandType = defineType({
  name: "siteBrand",
  title: "Site · Brand",
  type: "document",
  description: "Logo, hero photo, tagline, address, social links, and footer copy.",
  groups: [
    { name: "assets", title: "Visual Assets" },
    { name: "identity", title: "Identity & Copy" },
    { name: "contact", title: "Address & Social" },
  ],
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
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "Short brand line shown in the footer centre. E.g. \"Curation. Intention. Analogue.\"",
    }),
    defineField({
      name: "copyrightLine",
      title: "Copyright line",
      type: "string",
      group: "identity",
      description: "Footer copyright text. E.g. \"© 2025 The Analogue Room · Solvang, California\"",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
      description: "Venue address shown in the footer and Visit section. Use line breaks for multi-line.",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      group: "contact",
      description: "Display handle, e.g. @analogueroomsyv",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "sisterPropertyName",
      title: "Sister property name",
      type: "string",
      group: "contact",
      description: "E.g. \"Standing Sun Wines\"",
    }),
    defineField({
      name: "sisterPropertyUrl",
      title: "Sister property URL",
      type: "url",
      group: "contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site · Brand", subtitle: "Logo · Identity · Contact" }
    },
  },
})
