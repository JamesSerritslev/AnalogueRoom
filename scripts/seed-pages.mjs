/**
 * One-time seed: uploads public images and creates all page singletons + text defaults.
 *
 *   SANITY_API_TOKEN=sk... npm run seed:pages
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID (+ dataset) in .env.local or env.
 *
 * After each singleton is written, matching `drafts.<id>` documents are deleted when
 * present so Studio shows the published document (otherwise an empty stale draft can
 * hide seeded menu rows and other fields).
 *
 * If you see HTTP 502 from the asset API, wait a minute and run again — that is
 * usually a temporary Sanity gateway issue. This script retries automatically.
 */

import { createClient } from "@sanity/client"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")

const IDS = {
  siteBrand: "siteBrand",
  pageMenus: "pageMenus",
  pageHome: "pageHome",
  pageAbout: "pageAbout",
  pageEventsIndex: "pageEventsIndex",
  pageHostEvent: "pageHostEvent",
}

const DEFAULT_HERO_LEAD =
  "A vinyl lounge and wine bar in the heart of Solvang. A rotating selection of local and imported wines, beers, and non-alcoholic options — all paired with the warmth of music played the way it was meant to be heard."

const STORY_PARAS = [
  "Analogue Room is a small, intimate listening bar where wine, music, and conversation come together.",
  "Built around a deep love for vinyl, the space invites guests to slow down, share a bottle, and listen the way music was meant to be heard.",
  "The program features a thoughtful selection of wines alongside a rotating vinyl collection curated by the house and guest selectors.",
  "Evenings often unfold through records played from start to finish, creating a warm and immersive atmosphere that feels both nostalgic and alive.",
  "Part listening room, part wine bar, Analogue Room is a place for people who appreciate craftsmanship, culture, and the simple pleasure of gathering around great music and great wine.",
]

const DEFAULT_EVENTS_INTRO =
  "From listening parties and album releases to special pours and pop-ups — here's what's on at The Analogue Room."

const DEFAULT_HOST_INTRO =
  "From intimate birthday gatherings to listening parties and corporate retreats — The Analogue Room offers a one-of-a-kind backdrop for the moments that matter. Vinyl, thoughtful drinks, and a room designed to bring people together."

function loadEnvLocal() {
  const p = path.join(ROOT, ".env.local")
  if (!fs.existsSync(p)) return
  const text = fs.readFileSync(p, "utf8")
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function guessContentType(abs) {
  const lower = abs.toLowerCase()
  if (lower.endsWith(".png")) return "image/png"
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg"
  if (lower.endsWith(".webp")) return "image/webp"
  return "application/octet-stream"
}

/** Retry on transient Sanity / network failures (502 is common on asset uploads). */
async function withRetries(label, fn, { maxAttempts = 6, baseMs = 1500 } = {}) {
  let lastErr
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (e) {
      lastErr = e
      const code = e.statusCode ?? e.response?.statusCode
      const msg = typeof e.message === "string" ? e.message : ""
      const retryable =
        code === 502 ||
        code === 503 ||
        code === 504 ||
        code === 429 ||
        /ECONNRESET|ETIMEDOUT|fetch failed|socket/i.test(msg)
      if (!retryable || attempt === maxAttempts) {
        throw e
      }
      const wait = Math.min(45_000, baseMs * 2 ** (attempt - 1))
      console.warn(
        `${label}: attempt ${attempt}/${maxAttempts} failed (${code ?? "network"}). Retrying in ${Math.round(wait / 1000)}s…`,
      )
      await sleep(wait)
    }
  }
  throw lastErr
}

/** Studio opens `drafts.<id>` when present; an old empty draft hides freshly seeded published docs. */
async function discardSingletonDraft(client, publishedId) {
  const draftId = `drafts.${publishedId}`
  try {
    await client.delete(draftId)
  } catch (e) {
    if (e.statusCode !== 404) throw e
  }
}

async function uploadImage(client, relativePath) {
  const abs = path.join(ROOT, relativePath)
  if (!fs.existsSync(abs)) throw new Error(`Missing file: ${abs}`)
  const filename = path.basename(abs)
  const buffer = fs.readFileSync(abs)
  const label = `Upload ${filename}`
  return withRetries(label, () =>
    client.assets.upload("image", buffer, {
      filename,
      contentType: guessContentType(abs),
    }),
  )
}

function imgRef(asset) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  }
}

/** Add Sanity array keys + `_type` for menu categories and items. */
function menuCategoriesWithKeys(categories) {
  return categories.map((cat, ci) => ({
    _key: `mc${ci}`,
    _type: "menuCategory",
    title: cat.title,
    items: (cat.items || []).map((it, ii) => ({
      _key: `mc${ci}i${ii}`,
      _type: "menuItem",
      title: it.title,
      ...(it.description ? { description: it.description } : {}),
      ...(it.price ? { price: it.price } : {}),
    })),
  }))
}

const SEED_MENU_WINES = menuCategoriesWithKeys([
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
])

const SEED_MENU_BEER = menuCategoriesWithKeys([
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
      {
        title: "Local craft selection",
        description: "Ask for today’s lineup.",
        price: "8",
      },
      { title: "Import pilsner", description: "European lager.", price: "9" },
      {
        title: "Non-alcoholic beer",
        description: "Full flavor, zero proof.",
        price: "7",
      },
    ],
  },
])

const SEED_MENU_ZERO = menuCategoriesWithKeys([
  {
    title: "Soda & tonic",
    items: [
      {
        title: "House cola",
        description: "Classic soda fountain style.",
        price: "4",
      },
      { title: "Ginger beer", description: "Spicy and refreshing.", price: "5" },
      {
        title: "Sparkling water",
        description: "Bubbles, no sweetener.",
        price: "4",
      },
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
])

async function main() {
  loadEnvLocal()
  const token = process.env.SANITY_API_TOKEN?.trim()
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production"
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-01-01"

  if (!token) {
    console.error("Missing SANITY_API_TOKEN (Editor token from sanity.io/manage).")
    process.exit(1)
  }
  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.")
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })

  console.log("Uploading images …")
  const interior = await uploadImage(client, "public/images/interior.jpeg")
  await sleep(800)
  const logo = await uploadImage(client, "public/images/ar-logo.png")
  await sleep(800)
  const menuBgPath = path.join(ROOT, "public/images/on-the-menu.png")
  const menuBg = fs.existsSync(menuBgPath)
    ? await uploadImage(client, "public/images/on-the-menu.png")
    : null

  const interiorImg = imgRef(interior)
  const logoImg = imgRef(logo)
  const menuBgImg = menuBg ? imgRef(menuBg) : undefined

  await withRetries("Save siteBrand", () =>
    client.createOrReplace({
    _id: IDS.siteBrand,
    _type: "siteBrand",
    logo: logoImg,
    innerHero: interiorImg,
    }),
  )

  await withRetries("Save pageMenus", () =>
    client.createOrReplace({
      _id: IDS.pageMenus,
      _type: "pageMenus",
      wines: SEED_MENU_WINES,
      beer: SEED_MENU_BEER,
      zeroProof: SEED_MENU_ZERO,
    }),
  )

  await withRetries("Save pageHome", () =>
    client.createOrReplace({
    _id: IDS.pageHome,
    _type: "pageHome",
    heroBackground: interiorImg,
    heroLead: DEFAULT_HERO_LEAD,
    roomSectionImage: interiorImg,
    ...(menuBgImg ? { offeringsBackground: menuBgImg } : {}),
    }),
  )

  await withRetries("Save pageAbout", () =>
    client.createOrReplace({
    _id: IDS.pageAbout,
    _type: "pageAbout",
    storyParagraphs: STORY_PARAS,
    teamIntro:
      "A small team with a clear vision — to build a room that feels like home.",
    teamMembers: [
      { _key: "t0", name: "John Wright", role: "Owner" },
      { _key: "t1", name: "Blake Economus", role: "General Manager" },
      { _key: "t2", name: "Ray Fortune", role: "Bar Manager, Vinyl Curator" },
    ],
    }),
  )

  await withRetries("Save pageEventsIndex", () =>
    client.createOrReplace({
    _id: IDS.pageEventsIndex,
    _type: "pageEventsIndex",
    introBody: DEFAULT_EVENTS_INTRO,
    }),
  )

  await withRetries("Save pageHostEvent", () =>
    client.createOrReplace({
    _id: IDS.pageHostEvent,
    _type: "pageHostEvent",
    introBlurb: DEFAULT_HOST_INTRO,
    standing: { value: "60" },
    seated: { value: "40" },
    squareFootage: { value: "500" },
    minBooking: { value: "4hr+" },
    }),
  )

  for (const publishedId of Object.values(IDS)) {
    await withRetries(`Discard draft for ${publishedId}`, () =>
      discardSingletonDraft(client, publishedId),
    )
  }

  console.log(
    "\nDone. In Studio, open:\n" +
      "  Site · Brand, Menus, Page · Home, Page · About, Page · Events, Page · Host your event\n" +
      "Swap images or text as needed.\n" +
      "Stale Studio drafts for those singletons were removed so the editor matches the seeded published documents.\n",
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
