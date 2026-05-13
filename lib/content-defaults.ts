/** Fallback copy when Studio page singletons are empty (keeps deploys safe). */

import type { AboutTeamMember } from "@/lib/sanity/types"

export const DEFAULT_HERO_LEAD =
  "A vinyl lounge and wine bar in the heart of Solvang. A rotating selection of local and imported wines, beers, and non-alcoholic options — all paired with the warmth of music played the way it was meant to be heard."

export const DEFAULT_ABOUT_STORY_PARAGRAPHS = [
  "Analogue Room is a small, intimate listening bar where wine, music, and conversation come together.",
  "Built around a deep love for vinyl, the space invites guests to slow down, share a bottle, and listen the way music was meant to be heard.",
  "The program features a thoughtful selection of wines alongside a rotating vinyl collection curated by the house and guest selectors.",
  "Evenings often unfold through records played from start to finish, creating a warm and immersive atmosphere that feels both nostalgic and alive.",
  "Part listening room, part wine bar, Analogue Room is a place for people who appreciate craftsmanship, culture, and the simple pleasure of gathering around great music and great wine.",
] as const

export const DEFAULT_TEAM_INTRO =
  "A small team with a clear vision — to build a room that feels like home."

export const DEFAULT_TEAM_MEMBERS: AboutTeamMember[] = [
  { name: "John Wright", role: "Owner" },
  { name: "Blake Economus", role: "General Manager" },
  { name: "Ray Fortune", role: "Bar Manager, Vinyl Curator" },
]

export const DEFAULT_EVENTS_INDEX_INTRO =
  "From listening parties and album releases to special pours and pop-ups — here's what's on at The Analogue Room."

export const DEFAULT_HOST_EVENT_INTRO =
  "From intimate birthday gatherings to listening parties and corporate retreats — The Analogue Room offers a one-of-a-kind backdrop for the moments that matter. Vinyl, thoughtful drinks, and a room designed to bring people together."
