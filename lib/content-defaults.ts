/** Fallback copy when Studio page singletons are empty (keeps deploys safe). */

import type { AboutTeamMember, HoursRow, PillarItem } from "@/lib/sanity/types"

// ── Site Brand ──────────────────────────────────────────────────────────────
export const DEFAULT_TAGLINE = "Curation. Intention. Analogue."
export const DEFAULT_COPYRIGHT_LINE = "© 2026 The Analogue Room · Solvang, California"
export const DEFAULT_ADDRESS = "1693 Mission Drive\nSuite D2\nSolvang, CA 93463"
export const DEFAULT_INSTAGRAM_HANDLE = "@analogueroomsyv"
export const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/analogueroomsyv"
export const DEFAULT_SISTER_PROPERTY_NAME = "Standing Sun Wines"
export const DEFAULT_SISTER_PROPERTY_URL = "https://www.standingsunwines.com"

// ── Home · Hero ──────────────────────────────────────────────────────────────
export const DEFAULT_HERO_EYEBROW = "Vinyl Lounge · Solvang · Est. 2026"
export const DEFAULT_HERO_HEADLINE_LINE1 = "Vinyl Lounge in Solvang"
export const DEFAULT_HERO_HEADLINE_LINE2 = "Wine, Beer & Vinyl"
export const DEFAULT_HERO_LEAD =
  "The Analogue Room is a vinyl lounge, wine bar, and beer bar on Mission Drive in downtown Solvang. Curated wine and craft beer are served with vinyl spinning in the room. Open Thursday through Monday, 4pm to 10pm."
export const DEFAULT_HERO_META_HOURS = "Thu–Mon · 4pm–10pm"
export const DEFAULT_HERO_META_LOCATION = "1693 Mission Dr, Solvang"

// ── Home · Pillars ───────────────────────────────────────────────────────────
export const DEFAULT_PILLARS_EYEBROW = "Why Visit"
export const DEFAULT_PILLARS_HEADLINE = "What Sets Us Apart"
export const DEFAULT_PILLARS_BODY =
  "Solvang has plenty of tasting rooms and bars. The Analogue Room treats music as equal to the pour, with vinyl, wine, and craft beer under one roof."
export const DEFAULT_PILLARS: PillarItem[] = [
  {
    title: "Curation",
    description:
      "Every record and bottle is chosen with care. A rotating selection of wine, craft beer, and zero-proof drinks, not an oversized cocktail list.",
  },
  {
    title: "Intention",
    description:
      "Warm lighting and conversation-friendly volume. An intimate room built for listening, talking, and staying present.",
  },
  {
    title: "Analogue",
    description:
      "Music plays on vinyl, not streaming. Albums set the pace of the evening, with a warm analogue sound you will not get from a playlist.",
  },
]

// ── Home · Room ──────────────────────────────────────────────────────────────
export const DEFAULT_ROOM_EYEBROW = "Your Visit"
export const DEFAULT_ROOM_HEADLINE = "Come Settle In"
export const DEFAULT_ROOM_BODY = [
  "Arrive early for a corner seat on busy nights, especially Friday and Saturday. Indoor seating and an outdoor courtyard give you options for the evening.",
  "Ask staff what is spinning or what pairs with your pour. Stay awhile, browse vinyl on the walls, and let the records set the pace.",
]

// ── Home · Offerings ─────────────────────────────────────────────────────────
export const DEFAULT_OFFERINGS_EYEBROW = "Drinks & Food"
export const DEFAULT_OFFERINGS_HEADLINE = "Wine Bar, Beer Bar & Pizza"
export const DEFAULT_OFFERINGS_BODY =
  "A rotating selection of local and imported wines, craft beer, and zero-proof options, with pizza from Side Hustle Pizza."
export const DEFAULT_OFFERINGS_WINES_TITLE = "Wines"
export const DEFAULT_OFFERINGS_WINES_DESCRIPTION =
  "Local Santa Barbara County labels and imported bottles, chosen for the music and the mood."
export const DEFAULT_OFFERINGS_BEER_TITLE = "Beer"
export const DEFAULT_OFFERINGS_BEER_DESCRIPTION =
  "Craft beer from local breweries and farther afield, poured to complement the room and the records."
export const DEFAULT_OFFERINGS_ZERO_PROOF_TITLE = "Zero Proof"
export const DEFAULT_OFFERINGS_ZERO_PROOF_DESCRIPTION =
  "Mocktails, alcohol-free wines, and zero-proof beers so everyone has something to enjoy."
export const DEFAULT_OFFERINGS_FOOD_TITLE = "Pizza Kitchen"
export const DEFAULT_OFFERINGS_FOOD_DESCRIPTION =
  "Pizza from Side Hustle Pizza by the slice or pan, plus simple salads and small plates made to share."

// ── Home · Visit ─────────────────────────────────────────────────────────────
export const DEFAULT_VISIT_HEADLINE = "Hours & Location"
export const DEFAULT_VISIT_BODY =
  "Open Thursday to Monday, 4pm to 10pm. Closed Tuesday and Wednesday. 1693 Mission Drive, Suite D2, Solvang, CA 93463, steps from the Little Mermaid Fountain. Downtown parking lots make it easy to park once and walk."
export const DEFAULT_HOURS: HoursRow[] = [
  { day: "Monday", time: "4pm – 10pm", closed: false },
  { day: "Tuesday", time: "Closed", closed: true },
  { day: "Wednesday", time: "Closed", closed: true },
  { day: "Thursday", time: "4pm – 10pm", closed: false },
  { day: "Friday", time: "4pm – 10pm", closed: false },
  { day: "Saturday", time: "4pm – 10pm", closed: false },
  { day: "Sunday", time: "4pm – 10pm", closed: false },
]

// ── Home · FAQ ───────────────────────────────────────────────────────────────
export type HomeFaqItem = { question: string; answer: string }

export const DEFAULT_HOME_FAQ_EYEBROW = "FAQ"
export const DEFAULT_HOME_FAQ_HEADLINE = "Common Questions"
export const DEFAULT_HOME_FAQ: HomeFaqItem[] = [
  {
    question: "Do I need reservations?",
    answer:
      "Most nights you can walk in. Arrive early for the best seats on Friday and Saturday. Reservation options may be offered in the future.",
  },
  {
    question: "Can I request specific music?",
    answer:
      "Music is curated by Bar Manager and Vinyl Curator Ray Fortune, with guest selectors. The program centers on vinyl playback. Ask staff what is spinning.",
  },
  {
    question: "What are your hours?",
    answer:
      "Thursday to Monday, 4pm to 10pm. Closed Tuesday and Wednesday.",
  },
  {
    question: "Do you serve food?",
    answer:
      "Yes. Our pizza kitchen features pizza from Side Hustle Pizza by the slice or pan, plus salads and small shareable plates.",
  },
]

// ── About ────────────────────────────────────────────────────────────────────
export const DEFAULT_ABOUT_STORY_PARAGRAPHS = [
  "Analogue Room is a small, intimate listening bar where wine, music, and conversation come together.",
  "Built around a deep love for vinyl, the space invites guests to slow down, share a bottle, and listen the way music was meant to be heard.",
  "The program features a thoughtful selection of wines alongside a rotating vinyl collection curated by the house and guest selectors.",
  "Evenings often unfold through records played from start to finish, creating a warm and immersive atmosphere that feels both nostalgic and alive.",
  "Part listening room, part wine bar, Analogue Room is a place for people who appreciate craftsmanship, culture, and the simple pleasure of gathering around great music and great wine.",
] as const

export const DEFAULT_TEAM_INTRO =
  "A small team with a clear vision: to build a room that feels like home."

export const DEFAULT_TEAM_MEMBERS: AboutTeamMember[] = [
  { name: "John Wright", role: "Owner" },
  { name: "Blake Economus", role: "General Manager" },
  { name: "Ray Fortune", role: "Bar Manager, Vinyl Curator" },
]

export const DEFAULT_EVENTS_INDEX_INTRO =
  "From listening parties and album releases to special pours and pop-ups. Here's what's on at The Analogue Room."

export const DEFAULT_HOST_EVENT_INTRO =
  "From intimate birthday gatherings to listening parties and corporate retreats, The Analogue Room offers a one-of-a-kind backdrop for the moments that matter. Vinyl, thoughtful drinks, and a room designed to bring people together."
