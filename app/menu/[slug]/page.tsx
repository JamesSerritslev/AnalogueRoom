import { redirect } from "next/navigation"
import { isMenuSlug } from "@/lib/menu-defaults"
import { DRINKS_MENU_PATH } from "@/lib/site-routes"

type PageProps = { params: Promise<{ slug: string }> }

/** Legacy `/menu/wines` → `/wine-and-beer-menu#wines` */
export default async function LegacyMenuSlugRedirect({ params }: PageProps) {
  const { slug: raw } = await params
  const slug = decodeURIComponent(raw)
  if (isMenuSlug(slug)) {
    redirect(`${DRINKS_MENU_PATH}#${slug}`)
  }
  redirect(DRINKS_MENU_PATH)
}
