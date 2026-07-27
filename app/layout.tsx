import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { draftMode } from "next/headers"
import { DraftModeLoader } from "@/components/draft-mode-loader"
import { PageTransition } from "@/components/page-transition"
import { fontVariables } from "@/lib/fonts"
import { SanityLive } from "@/sanity/lib/live"

const GA_MEASUREMENT_ID = "G-Q2DC27H5DK"

/** Canonical site URL for absolute metadata (OG, etc.). Matches `sanity.config` preview origin logic. */
function getMetadataBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, "")
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`
  const vercelPublic = process.env.NEXT_PUBLIC_VERCEL_URL?.trim()
  if (vercelPublic) return `https://${vercelPublic.replace(/^https?:\/\//, "")}`
  return "http://localhost:3000"
}

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
  metadataBase: new URL(getMetadataBaseUrl()),
  title: "The Analogue Room | Vinyl Lounge Wine & Beer Bar | Solvang, CA",
  description:
    "Vinyl lounge, wine bar, and beer bar on Mission Drive in downtown Solvang. Full albums on vinyl with curated wine, craft beer, and pizza. Open Thursday through Monday, 4pm to 10pm.",
  keywords: [
    "vinyl lounge Solvang",
    "wine bar Solvang",
    "beer bar Solvang",
    "listening lounge",
    "Solvang",
    "Santa Ynez Valley",
    "vinyl",
    "hi-fi",
  ],
  openGraph: {
    title: "The Analogue Room | Vinyl Lounge in Solvang",
    description:
      "Vinyl lounge, wine bar, and beer bar in downtown Solvang. Full albums, curated drinks, and pizza.",
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Analogue Room | Vinyl Lounge in Solvang",
    description:
      "Vinyl lounge, wine bar, and beer bar in downtown Solvang. Full albums, curated drinks, and pizza.",
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
