import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { draftMode } from "next/headers"
import { DraftModeLoader } from "@/components/studio/draft-mode-loader"
import { LocalBusinessJsonLd } from "@/components/shared/local-business-json-ld"
import { PageTransition } from "@/components/layout/page-transition"
import { NavGate } from "@/components/layout/nav-gate"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { fontVariables } from "@/lib/fonts"
import { getSiteUrl } from "@/lib/site-url"
import { SanityLive } from "@/sanity/lib/live"

const GA_MEASUREMENT_ID = "G-Q2DC27H5DK"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#282b2e",
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Analogue Room · Vinyl Bar & Lounge in Solvang, CA",
    template: "%s · Analogue Room",
  },
  icons: {
    // Google prefers a stable square PNG larger than 48px; Bing wants /favicon.ico.
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    other: {
      "msvalidate.01": "2CF82E3E82C611FCBE60DCC61409B712",
    },
  },
  other: {
    "msapplication-TileImage": "/icon-192.png",
    "msapplication-TileColor": "#282b2e",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
      <body
        suppressHydrationWarning
        className="font-body min-h-dvh min-w-0 overflow-x-clip bg-cream text-coal antialiased"
      >
        <LocalBusinessJsonLd />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <NavGate>
          <SiteNavigation />
        </NavGate>
        <PageTransition>{children}</PageTransition>
        {isEnabled ? (
          <>
            <SanityLive />
            <DraftModeLoader />
          </>
        ) : null}
      </body>
    </html>
  )
}
