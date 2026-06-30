import { defineArrayMember, defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

/** Reusable line on a menu (used inside categories). */
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
      name: "price",
      title: "Price",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", price: "price" },
    prepare({ title, price }) {
      return {
        title: title || "Item",
        subtitle: price ? String(price) : "",
      }
    },
  },
})

/** Group of items (e.g. “By the glass”, “Bottles”). */
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
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "menuItem" })],
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return { title: title || "Category", subtitle: `${n} item${n === 1 ? "" : "s"}` }
    },
  },
})

function menuCategoriesField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "menuCategory" })],
    description: "Use categories to group lines (e.g. By the glass, Bottles).",
  })
}

export const pageMenusType = defineType({
  name: "pageMenus",
  title: "Menu Manager",
  type: "document",
  description:
    "Wine, beer, and zero-proof lists. Each menu uses categories; each item has a title, description, and price.",
  fields: [
    menuCategoriesField("wines", "Wines: categories"),
    menuCategoriesField("beer", "Beer: categories"),
    menuCategoriesField("zeroProof", "Zero proof: categories"),
    imageField(
      "heroBackground",
      "Hero background",
      "Full-bleed strip at the top of the Menu page. Empty = falls back to the Home hero image.",
    ),
  ],
  preview: {
    prepare() {
      return { title: "Menu Manager", subtitle: "Wine · Beer · Zero proof" }
    },
  },
})
