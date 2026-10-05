"use client"

import { ExternalLink } from "lucide-react"
import { FacebookIcon } from "@/components/icons/facebook-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"
import { OpenInMapsLink } from "@/components/shared/open-in-maps-link"
import {
  TrackedDirectionsLink,
  TrackedFacebookLink,
  TrackedInstagramLink,
  TrackedTelLink,
} from "@/components/shared/tracked-links"
import {
  DEFAULT_FACEBOOK_URL,
  DEFAULT_HOURS,
  DEFAULT_INSTAGRAM_HANDLE,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_SISTER_PROPERTY_NAME,
  DEFAULT_SISTER_PROPERTY_URL,
} from "@/lib/content-defaults"
import {
  VENUE_ADDRESS_LOCALITY,
  VENUE_ADDRESS_REGION,
  VENUE_NAME,
  VENUE_POSTAL_CODE,
  VENUE_STREET_ADDRESS,
  getVenuePhoneDisplay,
  getVenuePhoneTelHref,
} from "@/lib/venue-location"

const LABEL_CLASS =
  "font-label mb-2 block text-[10px] tracking-[0.35em] text-orange uppercase"

const VALUE_CLASS = "font-body text-[15px] leading-relaxed text-coal/85"

/**
 * Full contact block for the About page — address, phone, hours, social, maps.
 * Values come from venue-location + content-defaults (same as footer / GBP).
 */
export function AboutContact() {
  const phoneDisplay = getVenuePhoneDisplay()
  const phoneTel = getVenuePhoneTelHref()

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-y border-coal/10 bg-cream px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[920px]">
        <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
          Visit
        </p>
        <h2 className="font-display mb-3 text-[clamp(28px,3.4vw,40px)] leading-[1.08] text-coal">
          Contact
        </h2>
        <div className="mb-10 h-px w-8 bg-orange" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          <div>
            <strong className={LABEL_CLASS}>Address</strong>
            <p className={VALUE_CLASS}>
              <span className="font-display mb-1 block text-[18px] text-coal">
                {VENUE_NAME}
              </span>
              <TrackedDirectionsLink
                placement="about_contact_address"
                className="inline-block transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                {VENUE_STREET_ADDRESS}
                <br />
                {VENUE_ADDRESS_LOCALITY}, {VENUE_ADDRESS_REGION}{" "}
                {VENUE_POSTAL_CODE}
              </TrackedDirectionsLink>
            </p>
            <OpenInMapsLink
              placement="about_contact_maps"
              provider="google"
              className="mt-4 inline-flex min-h-10 items-center gap-1.5 border border-coal/25 px-3.5 py-2 font-label text-[10px] tracking-[0.2em] text-coal uppercase transition-colors hover:border-orange hover:text-orange"
            >
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            </OpenInMapsLink>
          </div>

          <div>
            <strong className={LABEL_CLASS}>Phone</strong>
            {phoneDisplay && phoneTel ? (
              <p className={VALUE_CLASS}>
                <TrackedTelLink
                  href={phoneTel}
                  placement="about_contact_phone"
                  className="transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  {phoneDisplay}
                </TrackedTelLink>
              </p>
            ) : (
              <p className={VALUE_CLASS}>—</p>
            )}

            <strong className={`${LABEL_CLASS} mt-8`}>Follow</strong>
            <div className="flex items-center gap-3">
              <TrackedInstagramLink
                href={DEFAULT_INSTAGRAM_URL}
                placement="about_contact"
                className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <InstagramIcon className="h-8 w-8" />
                <span className="sr-only">Instagram {DEFAULT_INSTAGRAM_HANDLE}</span>
              </TrackedInstagramLink>
              <TrackedFacebookLink
                href={DEFAULT_FACEBOOK_URL}
                placement="about_contact"
                className="inline-flex items-center justify-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <FacebookIcon className="h-8 w-8" />
                <span className="sr-only">Facebook</span>
              </TrackedFacebookLink>
            </div>
            <p className="font-body mt-2 text-[13px] text-coal/65">
              <TrackedInstagramLink
                href={DEFAULT_INSTAGRAM_URL}
                placement="about_contact_handle"
                className="transition-colors hover:text-orange"
              >
                {DEFAULT_INSTAGRAM_HANDLE}
              </TrackedInstagramLink>
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <strong className={LABEL_CLASS}>Hours</strong>
            <ul className="space-y-1.5">
              {DEFAULT_HOURS.map((row) => (
                <li
                  key={row.day}
                  className="flex items-baseline justify-between gap-4 border-b border-coal/8 py-1.5 last:border-b-0"
                >
                  <span className="font-body text-[14px] text-coal/80">
                    {row.day}
                  </span>
                  <span
                    className={`font-body text-[14px] tabular-nums ${
                      row.closed ? "text-coal/45" : "text-coal"
                    }`}
                  >
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="font-body mt-10 text-[13px] leading-relaxed text-coal/65">
          Sister property:{" "}
          <a
            href={DEFAULT_SISTER_PROPERTY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"
          >
            {DEFAULT_SISTER_PROPERTY_NAME}
          </a>
        </p>
      </div>
    </section>
  )
}
