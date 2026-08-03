import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const logoPath = path.join(root, "public", "images", "ar-logo.png")
const logo = await readFile(logoPath)

async function writePng(size, outRel) {
  const out = path.join(root, outRel)
  const buf = await sharp(logo)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(out, buf)
  console.log(`${outRel} (${size}x${size}, ${buf.length} bytes)`)
  return buf
}

/** Minimal ICO with one or more PNG-compressed images (Vista+). */
function pngsToIco(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length
  const headerSize = 6 + count * 16
  let offset = headerSize
  const entries = []
  const parts = []

  for (const { size, buf } of pngBuffersWithSizes) {
    entries.push({
      width: size >= 256 ? 0 : size,
      height: size >= 256 ? 0 : size,
      size: buf.length,
      offset,
    })
    parts.push(buf)
    offset += buf.length
  }

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // ICO
  header.writeUInt16LE(count, 4)

  for (let i = 0; i < count; i++) {
    const e = entries[i]
    const o = 6 + i * 16
    header[o] = e.width
    header[o + 1] = e.height
    header[o + 2] = 0 // color palette
    header[o + 3] = 0
    header.writeUInt16LE(1, o + 4) // color planes
    header.writeUInt16LE(32, o + 6) // bits
    header.writeUInt32LE(e.size, o + 8)
    header.writeUInt32LE(e.offset, o + 12)
  }

  return Buffer.concat([header, ...parts])
}

const meta = await sharp(logo).metadata()
console.log(`Source: ar-logo.png (${meta.width}x${meta.height})`)

const png16 = await writePng(16, "public/favicon-16x16.png")
const png32 = await writePng(32, "public/favicon-32x32.png")
const png48 = await writePng(48, "public/favicon-48x48.png")
await writePng(96, "public/favicon-96x96.png")
await writePng(180, "app/apple-icon.png")
await writePng(192, "app/icon.png")
await writePng(192, "public/icon-192.png")
await writePng(512, "public/icon-512.png")

const ico = pngsToIco([
  { size: 16, buf: png16 },
  { size: 32, buf: png32 },
  { size: 48, buf: png48 },
])

await writeFile(path.join(root, "app", "favicon.ico"), ico)
await writeFile(path.join(root, "public", "favicon.ico"), ico)
console.log(`favicon.ico (${ico.length} bytes) → app/ + public/`)
