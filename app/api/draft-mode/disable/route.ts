import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")

  const dm = await draftMode()
  dm.disable()
  redirect(slug && slug.startsWith("/") ? slug : "/")
}
