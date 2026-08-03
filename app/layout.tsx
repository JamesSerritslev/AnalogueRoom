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
    default: "Bars in Solvang | Vinyl Lounge · Analogue Room",
    template: "%s | The Analogue Room",
  },
  description:
    "A vinyl lounge and wine & beer bar for Solvang nightlife: full albums, thoughtful pours, at 1693 Mission Drive, Suite D2.",
  keywords: [
    "bars in Solvang",
    "Solvang nightlife",
    "vinyl lounge",
    "wine bar Solvang",
    "beer bar Solvang",
    "1693 Mission Drive",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Bars in Solvang | Vinyl Lounge · Analogue Room",
    description:
      "A vinyl lounge and wine & beer bar for Solvang nightlife: full albums, thoughtful pours, at 1693 Mission Drive, Suite D2.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Analogue Room",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bars in Solvang | Vinyl Lounge · Analogue Room",
    description:
      "A vinyl lounge and wine & beer bar for Solvang nightlife: full albums, thoughtful pours, at 1693 Mission Drive, Suite D2.",
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
