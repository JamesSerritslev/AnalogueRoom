import { defineField } from "sanity"

const statField = (name: string, title: string, defaultValue: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "value",
        type: "string",
        initialValue: defaultValue,
      }),
    ],
  })

export const venueStatFields = [
  statField("standing", "Standing capacity", "60"),
  statField("seated", "Seated capacity", "40"),
  statField("squareFootage", "Square footage", "500"),
  statField("minBooking", "Minimum booking", "4hr+"),
]
