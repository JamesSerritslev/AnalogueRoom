import { defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

/** Global brand assets and site-wide copy. */
export const siteBrandType = defineType({
  name: "siteBrand",
  title: "Site · Brand",
  type: "document",
  description: "Logo, hero photo, and tagline. Address, social links, and copyright are fixed in code.",
  groups: [
    { name: "assets", title: "Visual Assets" },
    { name: "identity", title: "Identity & Copy" },
  ],
  fields: [
    imageField(
      "logo",
      "Logo",
      "Nav, footer, and home hero. Square PNG or JPG works best.",
    ),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      description: "Short brand line shown in the footer centre. E.g. \"Curation. Intention. Analogue.\"",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site · Brand", subtitle: "Logo · Identity" }
    },
  },
})
