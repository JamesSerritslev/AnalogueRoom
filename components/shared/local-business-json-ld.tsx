import { getSiteUrl } from "@/lib/site-url"
import {
  getVenuePhoneDisplay,
  VENUE_ADDRESS_COUNTRY,
  VENUE_ADDRESS_LOCALITY,
  VENUE_ADDRESS_REGION,
  VENUE_LNG_LAT,
  VENUE_NAME,
  VENUE_OPENING_HOURS,
  VENUE_POSTAL_CODE,
  VENUE_STREET_ADDRESS,
} from "@/lib/venue-location"
import { DEFAULT_INSTAGRAM_URL } from "@/lib/content-defaults"

/**
 * Invisible LocalBusiness / BarOrPub JSON-LD for search engines.
 * Renders a `<script type="application/ld+json">` only — no visible UI.
 */
export function LocalBusinessJsonLd() {
  const siteUrl = getSiteUrl()
  const [lng, lat] = VENUE_LNG_LAT
  const phone = getVenuePhoneDisplay()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "EntertainmentBusiness"],
    "@id": `${siteUrl}/#business`,
    name: VENUE_NAME,
    description:
      "A vinyl listening lounge and wine & beer bar in Solvang, California. Full albums on vinyl, thoughtful drinks, and small bites.",
    url: siteUrl,
    image: [`${siteUrl}/images/og.png`, `${siteUrl}/icon-512.png`],
    logo: `${siteUrl}/icon-512.png`,
    ...(phone ? { telephone: phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: VENUE_STREET_ADDRESS,
      addressLocality: VENUE_ADDRESS_LOCALITY,
      addressRegion: VENUE_ADDRESS_REGION,
      postalCode: VENUE_POSTAL_CODE,
      addressCountry: VENUE_ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    openingHoursSpecification: VENUE_OPENING_HOURS.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${row.dayOfWeek}`,
      opens: row.opens,
      closes: row.closes,
    })),
    sameAs: [DEFAULT_INSTAGRAM_URL],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
