/** Default menu copy when Studio `pageMenus` is empty or missing rows. */

export const MENU_SLUGS = ["wines", "beer", "zero-proof"] as const
export type MenuSlug = (typeof MENU_SLUGS)[number]

type MenuItemRow = {
  title: string
  description?: string
  price?: string
}

export type MenuSection = {
  title: string
  items: MenuItemRow[]
}

export type ResolvedMenuPage = {
  slug: MenuSlug
  pageTitle: string
  eyebrow: string
  intro: string
  sections: MenuSection[]
}

const winesMenu: ResolvedMenuPage = {
  slug: "wines",
  pageTitle: "Wine Menu",
  eyebrow: "Drinks & Listening",
  intro: "A rotating pour list — ask what’s open tonight.",
  sections: [
    {
      title: "By the glass",
      items: [
        {
          title: "Santa Barbara County — rotating white",
          description: "Pours change often; ask what’s open.",
          price: "14",
        },
        {
          title: "Santa Barbara County — rotating red",
          description: "Local reds on rotation.",
          price: "15",
        },
        {
          title: "Import — sommelier’s pick",
          description: "A rotating import pour. Changes weekly.",
          price: "16",
        },
        {
          title: "Half glass (select pours)",
          description: "Available on select wines.",
          price: "8",
        },
      ],
    },
    {
      title: "Bottles",
      items: [
        {
          title: "Local favorite — chilled rosé",
          description: "Santa Barbara County.",
          price: "42",
        },
        {
          title: "Old World red — medium body",
          description: "Classic European profile.",
          price: "58",
        },
        {
          title: "Sparkling — celebratory pour",
          description: "750ml bottle service.",
          price: "64",
        },
      ],
    },
    {
      title: "Tasting",
      items: [
        {
          title: "Flight of three (staff picks)",
          description: "Three curated pours.",
          price: "22",
        },
      ],
    },
  ],
}

const beerMenu: ResolvedMenuPage = {
  slug: "beer",
  pageTitle: "Beer Menu",
  eyebrow: "Drinks & Listening",
  intro: "Cold, fresh, and chosen for the room.",
  sections: [
    {
      title: "Draft",
      items: [
        { title: "House lager", description: "Crisp and easy.", price: "7" },
        { title: "West Coast IPA", description: "Hoppy and bright.", price: "9" },
        { title: "Seasonal tap — ask", description: "Rotating handle.", price: "9" },
      ],
    },
    {
      title: "Bottle & can",
      items: [
        { title: "Local craft selection", description: "Ask for today’s lineup.", price: "8" },
        { title: "Import pilsner", description: "European lager.", price: "9" },
        { title: "Non-alcoholic beer", description: "Full flavor, zero proof.", price: "7" },
      ],
    },
  ],
}

const zeroProofMenu: ResolvedMenuPage = {
  slug: "zero-proof",
  pageTitle: "Zero Proof",
  eyebrow: "Drinks & Listening",
  intro: "The same care as our full bar — without the proof.",
  sections: [
    {
      title: "Soda & tonic",
      items: [
        { title: "House cola", description: "Classic soda fountain style.", price: "4" },
        { title: "Ginger beer", description: "Spicy and refreshing.", price: "5" },
        { title: "Sparkling water", description: "Bubbles, no sweetener.", price: "4" },
      ],
    },
    {
      title: "Mocktails",
      items: [
        {
          title: "Citrus & bitters (NA)",
          description: "Bright, aromatic, no alcohol.",
          price: "10",
        },
        {
          title: "Seasonal shrub",
          description: "Fruit and vinegar cordial — ask for today’s flavor.",
          price: "11",
        },
      ],
    },
    {
      title: "NA wine & beer",
      items: [
        {
          title: "Rotating NA wine — glass",
          description: "Thoughtful alcohol-free wine pours.",
          price: "12",
        },
        { title: "NA beer — bottle", description: "Crisp and familiar.", price: "8" },
      ],
    },
  ],
}

const DEFAULT_MENUS: Record<MenuSlug, ResolvedMenuPage> = {
  wines: winesMenu,
  beer: beerMenu,
  "zero-proof": zeroProofMenu,
}

export function isMenuSlug(s: string): s is MenuSlug {
  return (MENU_SLUGS as readonly string[]).includes(s)
}

export function getDefaultMenuForSlug(slug: MenuSlug): ResolvedMenuPage {
  return DEFAULT_MENUS[slug]
}
