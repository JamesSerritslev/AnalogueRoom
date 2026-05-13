import { redirect } from "next/navigation"
import { isMenuSlug } from "@/lib/menu-defaults"

type PageProps = { params: Promise<{ slug: string }> }

/** Old URLs `/menu/wines` → `/menu#wines` */
export default async function LegacyMenuSlugRedirect({ params }: PageProps) {
  const { slug: raw } = await params
  const slug = decodeURIComponent(raw)
  if (isMenuSlug(slug)) {
    redirect(`/menu#${slug}`)
  }
  redirect("/menu")
}
