import sharp from "sharp"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const logo = path.join(root, "public", "images", "ar-logo.png")

/**
 * Classic Windows ICO with BMP (BI_RGB) images — more compatible with
 * Bing/legacy crawlers than PNG-compressed ICO entries.
 */
async function pngSizeToBmpIcoEntry(size) {
  const { data, info } = await sharp(logo)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const width = info.width
  const height = info.height
  const rowSize = width * 4
  // BMP rows are bottom-up; AND mask follows (1 bit/pixel, padded to 32-bit rows)
  const andRowBytes = Math.ceil(width / 32) * 4
  const xorSize = rowSize * height
  const andSize = andRowBytes * height
  const dibHeaderSize = 40
  const imageSize = dibHeaderSize + xorSize + andSize
  const image = Buffer.alloc(imageSize)

  // BITMAPINFOHEADER
  image.writeUInt32LE(40, 0)
  image.writeInt32LE(width, 4)
  image.writeInt32LE(height * 2, 8) // XOR + AND
  image.writeUInt16LE(1, 12) // planes
  image.writeUInt16LE(32, 14) // bit count
  image.writeUInt32LE(0, 16) // BI_RGB
  image.writeUInt32LE(xorSize + andSize, 20)

  // XOR bitmap (BGRA, bottom-up)
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y
    for (let x = 0; x < width; x++) {
      const si = (srcY * width + x) * 4
      const di = dibHeaderSize + y * rowSize + x * 4
      image[di] = data[si + 2] // B
      image[di + 1] = data[si + 1] // G
      image[di + 2] = data[si] // R
      image[di + 3] = data[si + 3] // A
    }
  }
  // AND mask left zeroed (fully opaque for alpha-capable 32bpp)

  return { size, image }
}

async function writePng(size, outRel) {
  const out = path.join(root, outRel)
  const buf = await sharp(logo)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(out, buf)
  console.log(`${outRel} ${size}x${size} ${buf.length}B`)
  return buf
}

const sizes = [16, 32, 48]
const entries = []
for (const s of sizes) entries.push(await pngSizeToBmpIcoEntry(s))

const headerSize = 6 + entries.length * 16
let offset = headerSize
const header = Buffer.alloc(headerSize)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2) // ICO
header.writeUInt16LE(entries.length, 4)

const parts = [header]
for (let i = 0; i < entries.length; i++) {
  const e = entries[i]
  const o = 6 + i * 16
  header[o] = e.size >= 256 ? 0 : e.size
  header[o + 1] = e.size >= 256 ? 0 : e.size
  header[o + 2] = 0
  header[o + 3] = 0
  header.writeUInt16LE(1, o + 4)
  header.writeUInt16LE(32, o + 6)
  header.writeUInt32LE(e.image.length, o + 8)
  header.writeUInt32LE(offset, o + 12)
  parts.push(e.image)
  offset += e.image.length
}

const ico = Buffer.concat(parts)
await writeFile(path.join(root, "public", "favicon.ico"), ico)
console.log(`public/favicon.ico ${ico.length}B (BMP ICO)`)

const png16 = await writePng(16, "public/favicon-16x16.png")
const png32 = await writePng(32, "public/favicon-32x32.png")
const png48 = await writePng(48, "public/favicon-48x48.png")
const png96 = await writePng(96, "public/favicon-96x96.png")
await writeFile(path.join(root, "public", "favicon.png"), png96)
await writePng(180, "public/apple-icon.png")
await writePng(192, "public/icon-192.png")
await writePng(512, "public/icon-512.png")

// Bing often looks for these exact names
await writeFile(path.join(root, "public", "apple-touch-icon.png"), await sharp(logo).resize(180, 180).png().toBuffer())
console.log("public/apple-touch-icon.png")

void png16
void png32
void png48
