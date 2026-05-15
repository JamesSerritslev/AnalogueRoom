import type { Metadata, Viewport } from 'next'
import './globals.css'
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"
import { SanityLive } from "@/sanity/lib/live"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#282b2e',
}

/** Fonts load at runtime via <link> — avoids build failures when fonts.googleapis.com is unreachable (offline / firewall). */

export const metadata: Metadata = {
  title: 'The Analogue Room | Vinyl Lounge & Wine Bar | Solvang, CA',
  description: 'A curated vinyl lounge and wine bar in the heart of Solvang, California. Hand-selected records, thoughtful drinks, and a space designed for listening.',
  keywords: ['vinyl lounge', 'wine bar', 'listening lounge', 'Solvang', 'Santa Ynez Valley', 'records', 'hi-fi'],
  openGraph: {
    title: 'The Analogue Room | Vinyl Lounge & Wine Bar',
    description: 'A curated vinyl lounge and wine bar in the heart of Solvang, California.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Analogue Room | Vinyl Lounge & Wine Bar',
    description: 'A curated vinyl lounge and wine bar in the heart of Solvang, California.',
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Oswald:wght@200..700&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="font-body min-h-dvh min-w-0 overflow-x-hidden bg-cream text-coal antialiased">
        <div className="relative z-[1] min-h-dvh min-w-0 w-full max-w-full overflow-x-hidden">
          {children}
        </div>
        {isEnabled ? <VisualEditing /> : null}
        <SanityLive />
      </body>
    </html>
  )
}
