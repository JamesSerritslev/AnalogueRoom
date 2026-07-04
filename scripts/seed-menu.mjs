/**
 * Seed / update only the drinks menu (pageMenus.sections).
 * Preserves heroBackground and other fields already in Studio.
 *
 *   npm run seed:menu
 */

import { createClient } from "@sanity/client"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { SEED_MENU_SECTIONS } from "./menu-seed-data.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")

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

async function discardSingletonDraft(client, publishedId) {
  const draftId = `drafts.${publishedId}`
  try {
    await client.delete(draftId)
  } catch (e) {
    if (e.statusCode !== 404) throw e
  }
}

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

  const id = "pageMenus"
  const menuFields = {
    sections: SEED_MENU_SECTIONS,
    // Clear legacy three-column fields so Studio shows the print-order menu only.
    wines: [],
    beer: [],
    zeroProof: [],
  }

  const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id })
  if (existing?._id) {
    await client.patch(id).set(menuFields).commit()
    console.log("Updated pageMenus.sections (print-order menu). Hero background preserved.")
  } else {
    await client.createOrReplace({
      _id: id,
      _type: "pageMenus",
      ...menuFields,
    })
    console.log("Created pageMenus with full print-order menu.")
  }

  await discardSingletonDraft(client, id)
  console.log("Discarded stale Studio draft for pageMenus (if any).")
  console.log("Done. Open MENU MANAGER in Studio or visit /menu on the site.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
