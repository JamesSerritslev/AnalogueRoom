import type { Metadata, Viewport } from "next"
import "./globals.css"
import { draftMode } from "next/headers"
import { DraftModeLoader } from "@/components/draft-mode-loader"
import { PageTransition } from "@/components/page-transition"
import { fontVariables } from "@/lib/fonts"

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
  title: "The Analogue Room | Vinyl Lounge & Wine Bar | Solvang, CA",
  description:
    "A curated vinyl lounge and wine bar in the heart of Solvang, California. Hand-selected records, thoughtful drinks, and a space designed for listening.",
  keywords: [
    "vinyl lounge",
    "wine bar",
    "listening lounge",
    "Solvang",
    "Santa Ynez Valley",
    "records",
    "hi-fi",
  ],
  openGraph: {
    title: "The Analogue Room | Vinyl Lounge & Wine Bar",
    description: "A curated vinyl lounge and wine bar in the heart of Solvang, California.",
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Analogue Room | Vinyl Lounge & Wine Bar",
    description: "A curated vinyl lounge and wine bar in the heart of Solvang, California.",
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
        <PageTransition>{children}</PageTransition>
        {isEnabled ? <DraftModeLoader enabled /> : null}
      </body>
    </html>
  )
}
