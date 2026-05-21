import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "next-sanity"
import { validatePreviewUrl } from "@sanity/preview-url-secret"

function getSafeRedirectPath(input: string | null): string {
  if (!input) return "/"
  if (!input.startsWith("/")) return "/"
  if (input.startsWith("//")) return "/"
  return input
}

export async function GET(request: Request) {
  const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim()
  const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production").trim()
  const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01").trim()
  const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || process.env.SANITY_API_TOKEN?.trim()

  if (!projectId || !readToken) {
    return new Response("Missing SANITY project env or SANITY_API_READ_TOKEN on server.", {
      status: 500,
    })
  }

  const clientWithToken = createClient({
    projectId,
    dataset,
    apiVersion,
    token: readToken,
    useCdn: false,
  })

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(clientWithToken, request.url)

  if (!isValid) {
    return new Response("Invalid preview secret.", { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()
  redirect(getSafeRedirectPath(redirectTo))
}
