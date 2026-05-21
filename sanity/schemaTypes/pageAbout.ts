import { defineArrayMember, defineField, defineType } from "sanity"
import { imageField } from "./_imageField"

export const pageAboutType = defineType({
  name: "pageAbout",
  title: "Page · About",
  type: "document",
  description: "Story copy and team list. Headlines stay in the site design.",
  fields: [
    defineField({
      name: "storyParagraphs",
      title: "Story paragraphs",
      type: "array",
      description:
        "In order: first entries appear before the quote, the rest after (split after 3rd line if you have 5+).",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).max(8),
    }),
    defineField({
      name: "teamIntro",
      title: "Team section intro (optional)",
      type: "text",
      rows: 2,
      description: "One line under “Behind the Room”. Leave empty for default copy.",
    }),
    defineField({
      name: "teamMembers",
      title: "Team",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "aboutTeamMember",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            imageField(
              "photo",
              "Photo (optional)",
              "Headshot in the team grid. Empty keeps the default silhouette.",
            ),
            defineField({
              name: "bio",
              title: "Bio (optional)",
              type: "text",
              rows: 3,
              description: "A short bio shown below the name. Leave empty to hide.",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(8),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page · About", subtitle: "Story · Team" }
    },
  },
})
