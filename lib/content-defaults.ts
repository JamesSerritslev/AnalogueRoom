/** Fallback copy when Studio page singletons are empty (keeps deploys safe). */

import type { AboutTeamMember, HoursRow, PillarItem } from "@/lib/sanity/types"

// ── Site Brand ──────────────────────────────────────────────────────────────
export const DEFAULT_TAGLINE = "Curation. Intention. Analogue."
export const DEFAULT_COPYRIGHT_LINE = "© 2026 The Analogue Room · Solvang, California"
export const DEFAULT_ADDRESS = "1693 Mission Drive\nSuite D2\nSolvang, CA 93463"
export const DEFAULT_INSTAGRAM_HANDLE = "@analogueroomsyv"
export const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/analogueroomsyv"
export const DEFAULT_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61574339957083"
/** Clean listing URL (no share UTMs). */
export const DEFAULT_YELP_URL = "https://www.yelp.com/biz/analogue-room-solvang"
export const DEFAULT_SISTER_PROPERTY_NAME = "Standing Sun Wines"
export const DEFAULT_SISTER_PROPERTY_URL = "https://www.standingsunwines.com"

// ── Home · Hero ──────────────────────────────────────────────────────────────
export const DEFAULT_HERO_EYEBROW = "Solvang · California · Est. 2026"
export const DEFAULT_HERO_LEAD =
  "A vinyl lounge and wine bar in the heart of Solvang, offering a rotating selection of local and imported wines, beers, and non-alcoholic options, all paired with the warmth of music played the way it was meant to be heard."
export const DEFAULT_HERO_META_HOURS = "Thu–Sat · 4–10 · Sun–Mon · 4–8"
export const DEFAULT_HERO_META_LOCATION = "1693 Mission Drive, Suite D2, Solvang, CA 93463"

// ── Home · Pillars ───────────────────────────────────────────────────────────
export const DEFAULT_PILLARS_EYEBROW = "Our Approach"
export const DEFAULT_PILLARS_HEADLINE = "Three Words. One Room."
export const DEFAULT_PILLARS_BODY =
  "Everything we do is anchored in three principles. They're our compass, our standard, and our invitation to slow down."
export const DEFAULT_PILLARS: PillarItem[] = [
  {
    title: "Curation",
    description:
      "A rotating selection of wines, beers, and non-alcoholic offerings, chosen with care, served with context. Every record on the wall, every bottle on the shelf.",
  },
  {
    title: "Intention",
    description:
      "Nothing here is by accident. The lighting, the volume, the pour. We designed a room that asks you to be present, to listen, to settle in.",
  },
  {
    title: "Analogue",
    description:
      "Vinyl, played properly. No algorithms. No skips. The full album, the way the artist meant it. A return to the analogue way of listening.",
  },
]

// ── Home · Room ──────────────────────────────────────────────────────────────
export const DEFAULT_ROOM_EYEBROW = "The Space"
export const DEFAULT_ROOM_HEADLINE = "A Place to Slow Down"
export const DEFAULT_ROOM_BODY = [
  "The Analogue Room is a vinyl lounge and wine bar in the heart of Solvang, California, a space designed for those who believe the best moments come with a glass in your hand and a needle in the groove.",
  "We're not a club. We're not a museum. We're a room. A warm, intentional, beautifully cluttered room where the music breathes, the drinks are thoughtful, and the conversation finds its rhythm.",
]

// ── Home · Offerings ─────────────────────────────────────────────────────────
export const DEFAULT_OFFERINGS_EYEBROW = "Drinks & Listening"
export const DEFAULT_OFFERINGS_HEADLINE = "What's On the Menu"
export const DEFAULT_OFFERINGS_BODY =
  "A rotating menu, always evolving. Local where we can, imported where it makes sense, and never anything we wouldn't pour for ourselves."
export const DEFAULT_OFFERINGS_WINES_TITLE = "Wines"
export const DEFAULT_OFFERINGS_WINES_DESCRIPTION =
  "A rotating selection of local Santa Barbara County labels alongside imported pours from regions worth knowing. Curated for the moment, the music, and the mood."
export const DEFAULT_OFFERINGS_BEER_TITLE = "Beer"
export const DEFAULT_OFFERINGS_BEER_DESCRIPTION =
  "A thoughtful list of craft beers, both local and from further afield. Cold, fresh, and chosen to complement everything from a quiet evening to a packed Friday night."
export const DEFAULT_OFFERINGS_ZERO_PROOF_TITLE = "Zero Proof"
export const DEFAULT_OFFERINGS_ZERO_PROOF_DESCRIPTION =
  "A genuine, considered non-alcoholic menu. Sodas, mocktails, alcohol-free wines and beers, because the experience matters more than the alcohol."
export const DEFAULT_OFFERINGS_FOOD_TITLE = "Food"
export const DEFAULT_OFFERINGS_FOOD_DESCRIPTION =
  "Pizza by the slice or pan, plus simple salads. Made to share between records."

// ── Home · Visit ─────────────────────────────────────────────────────────────
export const DEFAULT_VISIT_HEADLINE = "When We're Spinning"
export const DEFAULT_VISIT_BODY =
  "Doors open Thursday through Monday for easygoing Solvang nightlife. Come early to grab a corner, stay late to find your favorite record on the shelf."
export const DEFAULT_HOURS: HoursRow[] = [
  { day: "Monday", time: "4pm – 8pm", closed: false },
  { day: "Tuesday", time: "Closed", closed: true },
  { day: "Wednesday", time: "Closed", closed: true },
  { day: "Thursday", time: "4pm – 10pm", closed: false },
  { day: "Friday", time: "4pm – 10pm", closed: false },
  { day: "Saturday", time: "4pm – 10pm", closed: false },
  { day: "Sunday", time: "4pm – 8pm", closed: false },
]

// ── About ────────────────────────────────────────────────────────────────────
export const DEFAULT_ABOUT_STORY_PARAGRAPHS = [
  "The Analogue Room in downtown Solvang opened in July 2026.",
  "Located at 1693 Mission Drive, Suite D2 in Founder's Square, the venue is a vinyl listening lounge, wine and beer bar, bottle and record shop, and pizza kitchen designed as a gathering place for music lovers and visitors in the Santa Ynez Valley.",
  "Founded by John Wright, owner of Standing Sun Wines, the space features a high-fidelity sound system, a curated vinyl-only music program, and a rotating selection of wines, craft beers, and nonalcoholic drinks. The food program, led by chef Joe Blanchard, offers focaccia-style pizzas and salads.",
  "The Analogue Room is open Monday, Wednesday, and Thursday from 4–8 p.m., and Friday and Saturday from 4–10 p.m.",
] as const

/** Orange emphasis phrases per about story paragraph (same order as paragraphs). */
export const DEFAULT_ABOUT_STORY_ACCENTS: readonly (readonly string[])[] = [
  ["downtown Solvang", "July 2026"],
  [
    "1693 Mission Drive, Suite D2",
    "Founder's Square",
    "vinyl listening lounge",
    "Santa Ynez Valley",
  ],
  ["John Wright", "Standing Sun Wines", "Joe Blanchard", "focaccia-style pizzas"],
  [
    "Monday, Wednesday, and Thursday from 4–8 p.m.",
    "Friday and Saturday from 4–10 p.m.",
  ],
]

export const DEFAULT_TEAM_INTRO =
  "A small team with a clear vision: to build a room that feels like home."

export const DEFAULT_TEAM_MEMBERS: AboutTeamMember[] = [
  { name: "John Wright", role: "Owner" },
  { name: "Blake Economus", role: "General Manager" },
  { name: "Ray Fortune", role: "Bar Manager, Vinyl Curator" },
]

export const DEFAULT_EVENTS_INDEX_INTRO =
  "From listening nights and guest DJs to special pours, Analogue Room is a vinyl bar in downtown Solvang with live music from the booth. There is no digital playlist. All music is hand-picked throughout the night, and our hours run later than most of town."

export const DEFAULT_HOST_EVENT_INTRO =
  "From intimate birthday gatherings to listening parties and corporate retreats, The Analogue Room offers a one-of-a-kind backdrop for the moments that matter. Vinyl, thoughtful drinks, and a room designed to bring people together."
