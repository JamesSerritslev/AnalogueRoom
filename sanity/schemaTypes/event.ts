import { defineField, defineType } from "sanity"
import { PermanentEventSlugInput } from "../components/permanent-event-slug-input"
import { eventSlugIsAvailable, isExistingPublishedEvent, isUniqueEventSlug } from "../lib/isUniqueEventSlug"

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Becomes the event page URL. Locked after the first publish. You can still change the title, photo, date, and other fields. To run this event again, change the date on this same document, or create a new event.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueEventSlug,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/['’]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      components: {
        input: PermanentEventSlugInput,
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const slug = typeof value?.current === "string" ? value.current.trim() : ""
          if (!slug) return "Slug is required"
          // Existing published events keep their URL forever. Do not block date/title/photo edits.
          if (await isExistingPublishedEvent(context)) return true
          if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(slug)) {
            return "Use letters, numbers, and hyphens only"
          }
          const unique = await eventSlugIsAvailable(slug, context)
          if (!unique) {
            return "This URL is already used by another event. Edit that event, or generate a different slug."
          }
          return true
        }),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Listening Party", value: "Listening Party" },
          { title: "Album Release", value: "Album Release" },
          { title: "Special Pour", value: "Special Pour" },
          { title: "Live Music", value: "Live Music" },
          { title: "Guest DJ", value: "Guest DJ" },
          { title: "Tasting Event", value: "Tasting Event" },
          { title: "Pop-Up", value: "Pop-Up" },
          { title: "Private Event", value: "Private Event" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recurring",
      title: "This event repeats every week",
      type: "boolean",
      initialValue: false,
      description: "Same page every week. The website always shows the next date.",
      options: { layout: "switch" },
    }),
    defineField({
      name: "happensOn",
      title: "Day of the week",
      type: "string",
      options: {
        list: [
          { title: "Sunday", value: "sunday" },
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
        ],
      },
      hidden: ({ document }) => !document?.recurring,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.recurring) return true
          if (!value) return "Pick the day this event happens"
          return true
        }),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description:
        "For a one-time event. After it leaves the calendar, set a new date and publish again to list it.",
      hidden: ({ document }) => Boolean(document?.recurring),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.recurring) return true
          if (!value) return "Required"
          return true
        }),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: 'e.g. "7pm – 10pm"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "Calendar teaser above See more info. If Full Description is empty, this also appears on the event page. Required for every event.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "longDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Optional. Extra write-up on this event’s page only. Leave empty if the short description is enough. The page still fills in from title, date, time, photo, shared venue copy, and other nights.",
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Event Date, Ascending",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Event Date, Descending",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      eventType: "eventType",
      recurring: "recurring",
      happensOn: "happensOn",
      media: "image",
    },
    prepare(selection) {
      const { title, date, eventType, recurring, happensOn, media } = selection
      const weekday =
        typeof happensOn === "string" && happensOn.length
          ? happensOn.charAt(0).toUpperCase() + happensOn.slice(1)
          : ""
      const subtitle = recurring
        ? ["Every week", weekday].filter(Boolean).join(" · ")
        : `${[eventType, date].filter(Boolean).join(" · ")}`
      return {
        title: title ?? "",
        subtitle,
        media,
      }
    },
  },
})
