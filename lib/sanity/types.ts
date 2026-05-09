import type { PortableTextBlock } from "@portabletext/types"

export interface Event {
  _id: string
  title: string
  slug?: {
    current: string
  }
  eventType: string
  date: string
  time: string
  description: string
  longDescription?: PortableTextBlock[]
  image?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  ticketUrl?: string
  featured?: boolean
}
