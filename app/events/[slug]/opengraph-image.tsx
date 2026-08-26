import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { getPublishedEventBySlug } from "@/lib/sanity/queries"
import { sanityOgImageUrl } from "@/lib/sanity/image-url"
import type { SanityImageField } from "@/lib/sanity/types"

export const runtime = "nodejs"
export const revalidate = 60
export const alt = "Event at The Analogue Room"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type ImageProps = { params: Promise<{ slug: string }> }

function eventPhotoUrl(image: SanityImageField | undefined): string | undefined {
  if (!image?.asset) return undefined
  const assetId = image.asset._ref || image.asset._id
  const forBuilder: SanityImageField = assetId
    ? { ...image, asset: { ...image.asset, _ref: assetId } }
    : image
  return sanityOgImageUrl(forBuilder, 1200)
}

function toDataUri(buffer: Buffer, mime: string): string {
  return `data:${mime};base64,${buffer.toString("base64")}`
}

async function fetchAsDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const mime = res.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg"
    const buffer = Buffer.from(await res.arrayBuffer())
    return toDataUri(buffer, mime)
  } catch {
    return null
  }
}

export default async function EventOpengraphImage({ params }: ImageProps) {
  const { slug: rawSlug } = await params
  const event = await getPublishedEventBySlug(decodeURIComponent(rawSlug))

  const fallbackPath = path.join(process.cwd(), "public", "images", "og.png")
  const stampPath = path.join(process.cwd(), "public", "icon-192.png")
  const [fallbackBuf, stampBuf] = await Promise.all([
    readFile(fallbackPath),
    readFile(stampPath),
  ])

  const fallbackSrc = toDataUri(fallbackBuf, "image/png")
  const stampSrc = toDataUri(stampBuf, "image/png")

  const remotePhoto = eventPhotoUrl(event?.image)
  const photoSrc = (remotePhoto ? await fetchAsDataUri(remotePhoto) : null) ?? fallbackSrc

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#282b2e",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            width: 1200,
            height: 630,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 44,
            bottom: 36,
            display: "flex",
            transform: "rotate(-11deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stampSrc} alt="" width={128} height={128} style={{ width: 128, height: 128 }} />
        </div>
      </div>
    ),
    { ...size },
  )
}
