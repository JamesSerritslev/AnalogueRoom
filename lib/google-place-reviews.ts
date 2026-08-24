import { unstable_cache } from "next/cache"
import {
  getGooglePlaceId,
  VENUE_ADDRESS_SINGLE_LINE,
  VENUE_NAME,
} from "@/lib/venue-location"

export type GooglePlaceReview = {
  rating: number
  text: string
  relativeTime: string
  authorName: string
  authorUri: string | null
}

export type GooglePlaceReviewsData = {
  rating: number | null
  userRatingCount: number | null
  reviews: GooglePlaceReview[]
}

type PlacesApiReview = {
  rating?: number
  relativePublishTimeDescription?: string
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: {
    displayName?: string
    uri?: string
  }
}

type PlacesApiDetails = {
  id?: string
  rating?: number
  userRatingCount?: number
  reviews?: PlacesApiReview[]
}

type PlacesApiSearch = {
  places?: Array<{ id?: string }>
}

function getApiKey(): string {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || ""
}

function mapReviews(raw: PlacesApiReview[] | undefined): GooglePlaceReview[] {
  if (!raw?.length) return []
  return raw
    .map((r) => {
      const text = (r.text?.text || r.originalText?.text || "").trim()
      const authorName = r.authorAttribution?.displayName?.trim() || "Google user"
      if (!text) return null
      return {
        rating: typeof r.rating === "number" ? r.rating : 5,
        text,
        relativeTime: r.relativePublishTimeDescription?.trim() || "",
        authorName,
        authorUri: r.authorAttribution?.uri?.trim() || null,
      } satisfies GooglePlaceReview
    })
    .filter((r): r is GooglePlaceReview => r !== null)
}

async function resolvePlaceId(apiKey: string): Promise<string> {
  const fromEnv = getGooglePlaceId()
  if (fromEnv) return fromEnv

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({
      textQuery: `${VENUE_NAME}, ${VENUE_ADDRESS_SINGLE_LINE}`,
      maxResultCount: 1,
    }),
  })

  if (!res.ok) {
    throw new Error(`places-searchText-${res.status}`)
  }
  const data = (await res.json()) as PlacesApiSearch
  const id = data.places?.[0]?.id?.trim() || ""
  if (!id) throw new Error("places-searchText-empty")
  return id
}

async function fetchPlaceDetails(
  apiKey: string,
  placeId: string,
): Promise<GooglePlaceReviewsData> {
  const id = placeId.replace(/^places\//, "")
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    if (process.env.NODE_ENV === "development") {
      console.warn("[google-place-reviews] Place Details failed", res.status, body.slice(0, 400))
    }
    throw new Error(`places-details-${res.status}`)
  }

  const data = (await res.json()) as PlacesApiDetails
  const reviews = mapReviews(data.reviews)

  return {
    rating: typeof data.rating === "number" ? data.rating : null,
    userRatingCount:
      typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    reviews,
  }
}

/** Throws on failure so `unstable_cache` does not persist empty/error results. */
async function loadGooglePlaceReviews(): Promise<GooglePlaceReviewsData> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error("places-api-key-missing")

  const placeId = await resolvePlaceId(apiKey)
  return fetchPlaceDetails(apiKey, placeId)
}

const getCachedGooglePlaceReviews = unstable_cache(
  loadGooglePlaceReviews,
  ["google-place-reviews-v2"],
  { revalidate: 60 * 60 * 6 },
)

/** Cached Place Details reviews (Places API New). Revalidates every 6 hours. */
export async function getGooglePlaceReviews(): Promise<GooglePlaceReviewsData | null> {
  if (!getApiKey()) return null
  try {
    return await getCachedGooglePlaceReviews()
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[google-place-reviews]", err)
    }
    return null
  }
}
