import { type SchemaTypeDefinition } from "sanity"
import { eventType } from "./event"
import { hostEventVenueStatsType } from "./hostEventVenueStats"
import { siteImageryType } from "./siteImagery"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteImageryType, eventType, hostEventVenueStatsType],
}
