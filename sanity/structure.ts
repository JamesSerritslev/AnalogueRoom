import type { StructureResolver } from "sanity/structure"

const SINGLETONS: { id: string; title: string; schema: string }[] = [
  { id: "siteBrand", title: "Site · Brand", schema: "siteBrand" },
  { id: "pageHome", title: "Page · Home", schema: "pageHome" },
  { id: "pageAbout", title: "Page · About", schema: "pageAbout" },
  { id: "pageEventsIndex", title: "Page · Events", schema: "pageEventsIndex" },
  { id: "pageHostEvent", title: "Page · Host your event", schema: "pageHostEvent" },
]

const MENU_MANAGER = { id: "pageMenus", title: "MENU MANAGER", schema: "pageMenus" }

const singletonIds = new Set([...SINGLETONS.map((s) => s.id), MENU_MANAGER.id])

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
      S.listItem()
        .title(MENU_MANAGER.title)
        .id(MENU_MANAGER.id)
        .schemaType(MENU_MANAGER.schema)
        .child(S.document().schemaType(MENU_MANAGER.schema).documentId(MENU_MANAGER.id)),
    ])
