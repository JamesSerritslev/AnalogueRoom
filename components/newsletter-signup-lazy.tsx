"use client"

import dynamic from "next/dynamic"
import { LazyWhenVisible } from "@/components/lazy-when-visible"

const NewsletterSignupForm = dynamic(
  () =>
    import("@/components/newsletter-signup-form").then((m) => ({
      default: m.NewsletterSignupForm,
    })),
  { ssr: false },
)

const formPlaceholder = (
  <div
    className="min-h-[280px] w-full animate-pulse rounded-sm border border-cream/10 bg-cream/5"
    aria-hidden
  />
)

export function NewsletterSignupLazy() {
  return (
    <LazyWhenVisible placeholder={formPlaceholder}>
      <NewsletterSignupForm />
    </LazyWhenVisible>
  )
}
