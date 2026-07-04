import { type SchemaTypeDefinition } from "sanity"
import { eventType } from "./event"
import { pageAboutType } from "./pageAbout"
import { pageEventsIndexType } from "./pageEventsIndex"
import { pageHomeType } from "./pageHome"
import { pageHostEventType } from "./pageHostEvent"
import {
  menuCategoryType,
  menuItemType,
  menuSectionType,
  pageMenusType,
} from "./pageMenus"
import { siteBrandType } from "./siteBrand"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteBrandType,
    menuItemType,
    menuCategoryType,
    menuSectionType,
    pageMenusType,
    pageHomeType,
    pageAboutType,
    pageEventsIndexType,
    pageHostEventType,
    eventType,
  ],
}
