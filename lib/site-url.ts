/**
 * Canonical public site origin (no trailing slash).
 * Matches metadata / Sanity preview origin logic in `app/layout.tsx`.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, "")
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`
  const vercelPublic = process.env.NEXT_PUBLIC_VERCEL_URL?.trim()
  if (vercelPublic) return `https://${vercelPublic.replace(/^https?:\/\//, "")}`
  return "http://localhost:3000"
}
