import { defineField } from "sanity"

export function imageField(
  name: string,
  title: string,
  description?: string,
) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
  })
}
