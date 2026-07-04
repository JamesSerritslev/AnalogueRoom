import { defineArrayMember, defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

/** One drink line. Use glass + bottle for pours; price alone for bottle/can or bottle-only lists. */
export const menuItemType = defineType({
  name: "menuItem",
  title: "Menu item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "glassPrice",
      title: "Glass price",
      type: "string",
      description: 'e.g. "13" or "12 / 15" for 6 oz / 9 oz.',
    }),
    defineField({
      name: "bottlePrice",
      title: "Bottle / can price",
      type: "string",
      description: 'e.g. "45" or "3 / 6" for two sizes.',
    }),
    defineField({
      name: "price",
      title: "Price (single column)",
      type: "string",
      description: "Use when there is only one price (beer, bottle list, spritz).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      glassPrice: "glassPrice",
      bottlePrice: "bottlePrice",
      price: "price",
    },
    prepare({ title, glassPrice, bottlePrice, price }) {
      const parts = [glassPrice, bottlePrice, price].filter(Boolean)
      return {
        title: title || "Item",
        subtitle: parts.length ? parts.join(" · ") : "",
      }
    },
  },
})

/** Category under a major section (e.g. Sparkling, Rosé). */
export const menuCategoryType = defineType({
  name: "menuCategory",
  title: "Category",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Category title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Price columns",
      type: "string",
      options: {
        list: [
          { title: "Glass · Bottle", value: "glass-bottle" },
          { title: "Bottle / Can", value: "bottle-can" },
          { title: "Single price", value: "single" },
        ],
        layout: "radio",
      },
      initialValue: "single",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "menuItem" })],
    }),
  ],
  preview: {
    select: { title: "title", items: "items", columns: "columns" },
    prepare({ title, items, columns }) {
      const n = Array.isArray(items) ? items.length : 0
      return {
        title: title || "Category",
        subtitle: `${n} item${n === 1 ? "" : "s"}${columns ? ` · ${columns}` : ""}`,
      }
    },
  },
})

/** Major menu block (Wines By the Glass, Beers, Wines by the Bottle). */
export const menuSectionType = defineType({
  name: "menuSection",
  title: "Menu section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Anchor slug",
      type: "slug",
      description: "Used for /menu#… links from the home page (e.g. wines, beer).",
      options: { source: "title", maxLength: 64 },
    }),
    defineField({
      name: "note",
      title: "Note under title",
      type: "string",
      description: 'e.g. "6 oz OR 9 oz Glass Pour Available"',
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "menuCategory" })],
    }),
  ],
  preview: {
    select: { title: "title", categories: "categories" },
    prepare({ title, categories }) {
      const n = Array.isArray(categories) ? categories.length : 0
      return {
        title: title || "Section",
        subtitle: `${n} categor${n === 1 ? "y" : "ies"}`,
      }
    },
  },
})

export const pageMenusType = defineType({
  name: "pageMenus",
  title: "Menu Manager",
  type: "document",
  description:
    "Full drinks menu in print order: Wines by the Glass, Beers, Wines by the Bottle.",
  fields: [
    defineField({
      name: "sections",
      title: "Menu sections",
      type: "array",
      of: [defineArrayMember({ type: "menuSection" })],
      description: "Ordered like the printed menu.",
    }),
    imageField(
      "heroBackground",
      "Hero background",
      "Full-bleed strip at the top of the Menu page. Empty = falls back to the Home hero image.",
    ),
  ],
  preview: {
    prepare() {
      return { title: "Menu Manager", subtitle: "Full drinks menu" }
    },
  },
})
