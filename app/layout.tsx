import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { draftMode } from "next/headers"
import { DraftModeLoader } from "@/components/draft-mode-loader"
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld"
import { PageTransition } from "@/components/page-transition"
import { fontVariables } from "@/lib/fonts"
import { getSiteUrl } from "@/lib/site-url"
import { SanityLive } from "@/sanity/lib/live"

const GA_MEASUREMENT_ID = "G-Q2DC27H5DK"

const ogImage = {
  url: "/images/og.png",
  width: 1024,
  height: 492,
  type: "image/png" as const,
  alt:
    "The Analogue Room: minimalist illustration of analog audio equipment with the ANALOGUE ROOM wordmark",
}

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
    template: "%s · The Analogue Room",
  },
  description:
    "Analogue Room is a vinyl bar and lounge in Solvang, CA: wine, craft beer, zero-proof pours, and full albums on vinyl at 1693 Mission Drive, Suite D2.",
  keywords: [
    "Analogue Room",
    "vinyl bar Solvang",
    "vinyl lounge Solvang",
    "Solvang nightlife",
    "wine bar Solvang",
    "beer bar Solvang",
    "1693 Mission Drive",
  ],
  icons: {
    // Bing prefers a real root /favicon.ico; keep PNG sizes for Google/Chrome.
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileImage": "/icon-192.png",
    "msapplication-TileColor": "#282b2e",
  },
  openGraph: {
    title: "Analogue Room · Vinyl Bar & Lounge in Solvang, CA",
    description:
      "Analogue Room is a vinyl bar and lounge in Solvang, CA: wine, craft beer, zero-proof pours, and full albums on vinyl at 1693 Mission Drive, Suite D2.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Analogue Room",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analogue Room · Vinyl Bar & Lounge in Solvang, CA",
    description:
      "Analogue Room is a vinyl bar and lounge in Solvang, CA: wine, craft beer, zero-proof pours, and full albums on vinyl at 1693 Mission Drive, Suite D2.",
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
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
        className="font-body min-h-dvh min-w-0 overflow-x-hidden bg-cream text-coal antialiased"
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
