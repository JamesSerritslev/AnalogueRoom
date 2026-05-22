import { getSiteImagery } from "@/lib/sanity/site-imagery"
import { Navigation } from "@/components/navigation"

export async function SiteNavigation() {
  const { siteLogoUrl } = await getSiteImagery()
  const showComingSoonLabel =
    process.env.NEXT_PUBLIC_COMING_SOON !== "false"

  return (
    <Navigation
      logoSrc={siteLogoUrl}
      showComingSoonLabel={showComingSoonLabel}
    />
  )
}
