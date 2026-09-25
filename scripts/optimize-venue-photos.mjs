import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

/**
 * Re-encode venue/food JPEGs for clarity (same approach as home hero).
 * Prefer `match-and-optimize-images.mjs --apply` when camera originals
 * are available in Downloads — that restores resolution, not just quality.
 *
 * This script only re-encodes existing public files (no downscale).
 */
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const dirs = [
  path.join(root, "public", "images", "about"),
  path.join(root, "public", "images", "food"),
]

async function optimizeJpeg(filePath) {
  const before = fs.statSync(filePath).size
  const meta = await sharp(filePath).metadata()
  const long = Math.max(meta.width ?? 0, meta.height ?? 0)
  // Already hero-class — leave alone
  if (long >= 3000 && before > 1_200_000) {
    console.log(
      `${path.basename(filePath)}: skip (already ${meta.width}x${meta.height}, ${Math.round(before / 1024)}KB)`,
    )
    return
  }
  const buf = await sharp(filePath)
    .rotate()
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  if (buf.length >= before * 1.35 && before > 80_000) {
    console.log(
      `${path.basename(filePath)}: kept ${Math.round(before / 1024)}KB (re-encode larger)`,
    )
    return
  }
  const tmp = `${filePath}.tmp.jpg`
  fs.writeFileSync(tmp, buf)
  fs.unlinkSync(filePath)
  fs.renameSync(tmp, filePath)
  console.log(
    `${path.basename(filePath)}: ${meta.width}x${meta.height}  ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`,
  )
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort()
  console.log(`Optimizing ${files.length} in ${path.basename(dir)}…`)
  for (const f of files) {
    await optimizeJpeg(path.join(dir, f))
  }
}

const interior = path.join(root, "public", "images", "interior.jpeg")
if (fs.existsSync(interior)) {
  const before = fs.statSync(interior).size
  const buf = await sharp(interior)
    .rotate()
    .resize(2400, null, { withoutEnlargement: true, kernel: "lanczos3" })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  fs.writeFileSync(interior, buf)
  const meta = await sharp(buf).metadata()
  console.log(
    `interior.jpeg: ${meta.width}x${meta.height}  ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`,
  )
}

console.log("Done")
