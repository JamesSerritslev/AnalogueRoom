import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const aboutDir = path.join(root, "public", "images", "about")

/** Keep display names stable; compress in place. */
async function optimizeJpeg(filePath) {
  const before = fs.statSync(filePath).size
  const meta = await sharp(filePath).metadata()
  const buf = await sharp(filePath)
    .rotate()
    .jpeg({ quality: 75, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer()
  const tmp = `${filePath}.tmp.jpg`
  fs.writeFileSync(tmp, buf)
  fs.unlinkSync(filePath)
  fs.renameSync(tmp, filePath)
  const after = buf.length
  console.log(
    `${path.basename(filePath)}: ${meta.width}x${meta.height}  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`,
  )
  return { width: meta.width, height: meta.height }
}

async function optimizeFoodMenu() {
  const pngPath = path.join(root, "public", "food-menu.png")
  if (!fs.existsSync(pngPath)) return
  const before = fs.statSync(pngPath).size
  const buf = await sharp(pngPath)
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toBuffer()
  // If palette PNG isn't smaller, fall back to high-compress truecolor
  const buf2 = await sharp(pngPath)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()
  const out = buf.length < buf2.length ? buf : buf2
  if (out.length < before) {
    fs.writeFileSync(pngPath, out)
    console.log(
      `food-menu.png: ${Math.round(before / 1024)}KB → ${Math.round(out.length / 1024)}KB`,
    )
  } else {
    console.log(`food-menu.png: kept ${Math.round(before / 1024)}KB (no savings)`)
  }
}

const files = fs
  .readdirSync(aboutDir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort()

console.log(`Optimizing ${files.length} venue photos…`)
for (const f of files) {
  await optimizeJpeg(path.join(aboutDir, f))
}
await optimizeFoodMenu()
console.log("Done")
