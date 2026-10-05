/** Fallback copy when Studio page singletons are empty (keeps deploys safe). */

import type { AboutTeamMember, HoursRow, PillarItem } from "@/lib/sanity/types"

// ── Site Brand ──────────────────────────────────────────────────────────────
export const DEFAULT_TAGLINE = "Curation. Intention. Analogue."
export const DEFAULT_COPYRIGHT_LINE = "© 2026 Analogue Room · Solvang, California"
export const DEFAULT_ADDRESS = "1693 Mission Drive\nSuite D2\nSolvang, CA 93463"
export const DEFAULT_INSTAGRAM_HANDLE = "@analogueroomsyv"
export const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/analogueroomsyv"
export const DEFAULT_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61574339957083"
/** Clean listing URL (no share UTMs). */
export const DEFAULT_YELP_URL = "https://www.yelp.com/biz/analogue-room-solvang"
/** Cash App order link. */
export const DEFAULT_ORDER_ONLINE_URL = "https://cash.app/$analogueroom"
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
      "Vinyl, played properly. No algorithms. A return to the analogue way of listening.",
  },
]

/** Studio copy can still contain the old full-album line; swap it for the current default. */
export function resolvePillarDescription(pillar: PillarItem): string {
  const description = pillar.description?.trim() ?? ""
  if (!/full album|played in full|no skips/i.test(description)) return description
  return (
    DEFAULT_PILLARS.find((item) => item.title === pillar.title?.trim())
      ?.description ?? description
  )
}

// ── Home · Room ──────────────────────────────────────────────────────────────
export const DEFAULT_ROOM_EYEBROW = "The Space"
export const DEFAULT_ROOM_HEADLINE = "A Place to Slow Down"
export const DEFAULT_ROOM_BODY = [
  "Analogue Room is a vinyl lounge and wine bar in the heart of Solvang, California, a space designed for those who believe the best moments come with a glass in your hand and a needle in the groove.",
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
  "Analogue Room in downtown Solvang opened in July 2026.",
  "Located at 1693 Mission Drive, Suite D2 in Founder's Square, the venue is a vinyl listening lounge, wine and beer bar, bottle shop, and pizza kitchen designed as a gathering place for music lovers and visitors in the Santa Ynez Valley.",
  "Founded by John Wright, owner of Standing Sun Wines, the space features a high-fidelity sound system, a curated vinyl-only music program, and a rotating selection of wines, craft beers, and nonalcoholic drinks. The food program, led by Joe Blanchard, offers focaccia-style pizzas and salads.",
  "Analogue Room is open Thursday through Saturday from 4–10 p.m., and Sunday and Monday from 4–8 p.m. Closed Tuesday and Wednesday.",
] as const

export const DEFAULT_TEAM_INTRO =
  "A small team with a clear vision: to build a room that feels like home."

export const DEFAULT_TEAM_MEMBERS: AboutTeamMember[] = [
  { name: "John Wright", role: "Owner" },
  { name: "Blake Economus", role: "General Manager" },
  { name: "Ray Fortune", role: "Bar Manager, Vinyl Curator" },
]

/** About page FAQ — full business Q&A (review before push). */
export const DEFAULT_ABOUT_FAQ = [
  {
    question: "What is Analogue Room?",
    answer:
      "Analogue Room is a vinyl listening lounge, wine and beer bar, bottle shop, and pizza kitchen in downtown Solvang. We play vinyl through a high-fidelity system, pour a rotating list of wines, craft beers, and zero-proof drinks, and serve focaccia-style pizzas and salads.",
  },
  {
    question: "Where are you located?",
    answer:
      "We're at 1693 Mission Drive, Suite D2, in Founder's Square, downtown Solvang, California 93463. Phone: (805) 691-9093.",
  },
  {
    question: "What are your hours?",
    answer:
      "Thursday through Saturday 4–10 p.m., Sunday and Monday 4–8 p.m. Closed Tuesday and Wednesday. We're open later than most of downtown Solvang!",
  },
  {
    question: "What kind of music do you play?",
    answer:
      "We have many different genres of music on our shelves. If you see an album you love up on the shelves, you can ask for us to give it a spin. Guest DJs and listening nights appear on our events calendar when scheduled.",
  },
  {
    question: "Do you serve food?",
    answer:
      "Yes. Side Hustle Pizza serves focaccia-style pizzas by the slice or pan, plus simple salads meant to pair with drinks and music. See the full list on our pizza and salad menu.",
  },
  {
    question: "What do you pour to drink?",
    answer:
      "A rotating selection of local Santa Barbara County wines and imports, craft beer, and a considered zero-proof menu. You can also take bottles home from our bottle shop. Browse the wine and beer menu for what's on now.",
  },
  {
    question: "Can I order pizza or wine online for pickup?",
    answer:
      "Yes. You can order pizza online for pickup, and you can order a bottle of wine online for pickup. Use Order Online on this site, then swing by when your order is ready.",
  },
  {
    question: "Can I host a private event?",
    answer:
      "Yes. Birthdays, listening parties, corporate gatherings, and other private bookings are welcome. Start with Host Your Event on this site and our team will follow up.",
  },
  {
    question: "Is Analogue Room 21+?",
    answer:
      "The whole family and pets are welcome! Guests ordering or being served alcohol must be 21 or older with valid ID.",
  },
] as const

/** Short line above Order Online on the drinks menu. */
export const DEFAULT_DRINKS_ORDER_ONLINE_NOTE =
  "Want a bottle for later? Order online for pickup."

/** Short line above Order Online on the food menu. */
export const DEFAULT_FOOD_ORDER_ONLINE_NOTE =
  "Craving a slice? Order pizza online for pickup."

export const DEFAULT_EVENTS_INDEX_INTRO =
  "From listening nights and guest DJs to special pours, Analogue Room is a vinyl bar in downtown Solvang with live music from the booth. There is no digital playlist. All music is hand-picked throughout the night, and our hours run later than most of town."

export const DEFAULT_HOST_EVENT_INTRO =
  "From intimate birthday gatherings to listening parties and corporate retreats, Analogue Room offers a one-of-a-kind backdrop for the moments that matter. Vinyl, thoughtful drinks, and a room designed to bring people together."
