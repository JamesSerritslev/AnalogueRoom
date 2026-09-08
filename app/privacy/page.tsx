import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"
import { buildPageMetadata } from "@/lib/page-metadata"
import { PRIVACY_PATH } from "@/lib/site-routes"
import {
  VENUE_ADDRESS_SINGLE_LINE,
  VENUE_PHONE_DISPLAY,
  getVenuePhoneTelHref,
} from "@/lib/venue-location"

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy · Analogue Room",
  description:
    "How The Analogue Room in Solvang handles information you choose to share: location, newsletter signup, and host-event inquiries.",
  keywords: ["privacy policy", "analogue room", "solvang"],
  path: PRIVACY_PATH,
})

const LINK_CLASS =
  "text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange"

const H2_CLASS =
  "font-display mb-3 mt-10 text-[clamp(24px,3vw,32px)] leading-[1.1] text-coal first:mt-0"

const P_CLASS = "font-body mb-4 text-[15px] leading-relaxed text-coal/85"

export default function PrivacyPage() {
  const phoneTel = getVenuePhoneTelHref()

  return (
    <>
      <main>
        <article className="mx-auto max-w-[720px] px-4 pb-16 pt-page-hero sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:px-12">
          <p className="font-label mb-4 text-[10px] tracking-[0.5em] text-orange uppercase">
            Legal
          </p>
          <h1 className="font-display mb-4 text-[clamp(36px,5vw,56px)] leading-[1.05] text-coal">
            Privacy <em className="not-italic text-orange">Policy</em>
          </h1>
          <div className="mb-6 h-0.5 w-12 bg-orange" />
          <p className="font-label mb-10 text-[10px] tracking-[0.28em] text-coal/50 uppercase">
            Last updated September 8, 2026
          </p>

          <p className={P_CLASS}>
            The Analogue Room is a vinyl lounge and wine bar in Solvang,
            California. We do not create accounts on this site. We only collect
            personal information when you choose to share it: allowing location,
            joining our email list, or sending a Host Your Event inquiry.
          </p>

          <h2 className={H2_CLASS}>Location</h2>
          <p className={P_CLASS}>
            Some features ask the browser for your location. That only happens
            if you allow it. If you decline, the site still works.
          </p>
          <p className={P_CLASS}>
            When you allow location, your device shares coordinates with us. We
            may store them with a newsletter signup or inquiry so we know
            roughly where guests are coming from. We do not track you in the
            background or sell location data. The map on the site is a Google
            Maps embed of our Solvang address, not a live track of yours.
          </p>

          <h2 className={H2_CLASS}>Newsletter</h2>
          <p className={P_CLASS}>
            The “Join our List” form is optional. If you submit it, we collect
            your first name, last name, email address, and phone number if you
            add one. If you have allowed location, we may also store those
            coordinates with that signup.
          </p>
          <p className={P_CLASS}>
            We use that information to send updates about nights, hours, and
            what’s on at the room. Signups are stored with Mailchimp, which
            sends the emails. You can unsubscribe from any message we send.
          </p>

          <h2 className={H2_CLASS}>Host Your Event inquiries</h2>
          <p className={P_CLASS}>
            The inquiry form on{" "}
            <Link href="/host-event" className={LINK_CLASS}>
              Host Your Event
            </Link>{" "}
            is optional. If you submit it, we collect your name, email, phone,
            event type, guest count, preferred date and time, and any message
            you write. We use that to reply about a private booking.
          </p>
          <p className={P_CLASS}>
            Inquiries are emailed to our team. We may also add your name,
            email, and phone to the same Mailchimp list so we can follow up.
            If you allowed location, those coordinates may be stored with the
            signup as described above.
          </p>

          <h2 className={H2_CLASS}>How we use information</h2>
          <p className={P_CLASS}>
            We use what you send to run the list, answer booking questions, and
            understand roughly where guests are coming from when they opt in.
            We do not sell personal information. We do not share it for
            advertising. Service providers (Mailchimp and our email provider)
            see only what they need to do that work.
          </p>

          <h2 className={H2_CLASS}>Website analytics</h2>
          <p className={P_CLASS}>
            The site uses Google Analytics to see which pages are visited. That
            is ordinary usage data, not a form you fill out. You can block
            analytics cookies in your browser if you prefer.
          </p>

          <h2 className={H2_CLASS}>How long we keep it</h2>
          <p className={P_CLASS}>
            Newsletter contacts stay on the list until you unsubscribe or ask
            us to remove you. Host-event emails stay as long as we need them
            to plan or follow up on a booking.
          </p>

          <h2 className={H2_CLASS}>Your choices</h2>
          <p className={P_CLASS}>
            You can refuse location, skip the forms, or unsubscribe from
            emails at any time. To correct or delete what we have, call or
            write us using the details below.
          </p>

          <h2 className={H2_CLASS}>Children</h2>
          <p className={P_CLASS}>
            This site is not directed at children under 13, and we do not
            knowingly collect their information.
          </p>

          <h2 className={H2_CLASS}>Contact</h2>
          <p className={P_CLASS}>
            The Analogue Room
            <br />
            {VENUE_ADDRESS_SINGLE_LINE}
            <br />
            {phoneTel ? (
              <a href={phoneTel} className={LINK_CLASS}>
                {VENUE_PHONE_DISPLAY}
              </a>
            ) : (
              VENUE_PHONE_DISPLAY
            )}
          </p>
          <p className={P_CLASS}>
            Questions about this policy can go to that address or phone, or
            ask us in the room.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
