import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { Navigation } from "@/components/navigation"

export async function SiteNavigation() {
  const { siteLogoUrl } = await getSiteImagery()
  return <Navigation logoSrc={siteLogoUrl} />
}
