import { defineField, defineType } from "sanity"

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: {
      hotspot: true,
    },
  })

export const siteImageryType = defineType({
  name: "siteImagery",
  title: "Site imagery",
  type: "document",
  description:
    "Global photos: home hero background, inner-page heroes, logo, and optional “The Space” image. Leave fields empty to keep built-in defaults.",
  fields: [
    imageField(
      "homeHero",
      "Home hero background",
      "Full-bleed photo behind the home page hero (replaces /images/interior.jpeg when set).",
    ),
    imageField(
      "innerPageHero",
      "Inner page hero background",
      "About, Events list, Event detail fallback, Host Your Event heroes. Empty = same as home hero background, then default file.",
    ),
    imageField(
      "logo",
      "Site logo",
      "Nav, footer, and home hero mark (replaces /images/ar-logo.png when set). Square PNG or JPG works best.",
    ),
    imageField(
      "roomTheSpace",
      "The Space — photo (optional)",
      "If set, replaces the animated vinyl graphic in “A Place to Slow Down”. Leave empty to keep the record visual.",
    ),
  ],
  preview: {
    prepare() {
      return {
        title: "Site imagery",
        subtitle: "Heroes · Logo · Room",
      }
    },
  },
})
