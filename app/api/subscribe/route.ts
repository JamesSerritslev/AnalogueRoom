import crypto from "node:crypto"
import { NextResponse } from "next/server"

/** Simple in-memory rate limiter: max 5 requests per IP per 60 s. */
const ipHits = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

function getString(body: unknown, key: string): string {
  if (typeof body !== "object" || body === null) return ""
  const val = (body as Record<string, unknown>)[key]
  return typeof val === "string" ? val.trim() : ""
}

function getNumber(body: unknown, key: string): number | undefined {
  if (typeof body !== "object" || body === null) return undefined
  const val = (body as Record<string, unknown>)[key]
  return typeof val === "number" && isFinite(val) ? val : undefined
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const email = getString(body, "email")
  const firstName = getString(body, "firstName")
  const lastName = getString(body, "lastName")
  const phone = getString(body, "phone")
  const city = getString(body, "city")
  const state = getString(body, "state")
  const zip = getString(body, "zip")
  const lat = getNumber(body, "lat")
  const lng = getNumber(body, "lng")

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const SERVER = process.env.MAILCHIMP_SERVER

  if (!API_KEY || !AUDIENCE_ID || !SERVER) {
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable." },
      { status: 503 },
    )
  }

  const mergeFields: Record<string, unknown> = {
    FNAME: firstName || "",
    LNAME: lastName || "",
  }
  if (phone) mergeFields.PHONE = phone
  if (city || state) {
    mergeFields.MMERGE5 = [city, state, zip].filter(Boolean).join(", ")
  }

  const payload: Record<string, unknown> = {
    email_address: email,
    status: "subscribed",
    merge_fields: mergeFields,
  }

  if (lat !== undefined && lng !== undefined) {
    payload.location = { latitude: lat, longitude: lng }
  }

  // PUT upsert: creates new members OR updates existing ones (no "Member Exists" rejection)
  const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex")
  const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`

  // status_if_new only applies to brand-new members; existing members keep their current status
  payload.status_if_new = "subscribed"
  delete payload.status

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as {
    title?: string
    detail?: string
  }

  if (!response.ok) {
    // Permanently deleted contacts can't be re-added via API; treat as success from the user's perspective
    if (typeof data.detail === "string" && data.detail.includes("permanently deleted")) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    return NextResponse.json(
      { error: data.detail || "Something went wrong" },
      { status: 400 },
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
