import type { StructureResolver } from "sanity/structure"

const SINGLETONS: { id: string; title: string; schema: string }[] = [
  { id: "siteBrand", title: "Site · Brand", schema: "siteBrand" },
  { id: "pageMenus", title: "Menus", schema: "pageMenus" },
  { id: "pageHome", title: "Page · Home", schema: "pageHome" },
  { id: "pageAbout", title: "Page · About", schema: "pageAbout" },
  { id: "pageEventsIndex", title: "Page · Events", schema: "pageEventsIndex" },
  { id: "pageHostEvent", title: "Page · Host your event", schema: "pageHostEvent" },
]

const singletonIds = new Set(SINGLETONS.map((s) => s.id))

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .schemaType(s.schema)
          .child(S.document().schemaType(s.schema).documentId(s.id)),
      ),
      S.divider(),
      ...S.documentTypeListItems()
        .filter((item) => {
          const id =
            item.getId?.() ?? (item as unknown as { spec?: { id?: string } }).spec?.id
          return !singletonIds.has(id ?? "")
        })
        .map((item) => {
          const id =
            item.getId?.() ?? (item as unknown as { spec?: { id?: string } }).spec?.id
          if (id === "event") {
            return item.title("EVENT MANAGER")
          }
          return item
        }),
    ])
