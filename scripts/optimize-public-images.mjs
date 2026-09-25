import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const imagesDir = path.join(root, "public", "images")

async function optimizeJpeg(name, maxWidth) {
  const file = path.join(imagesDir, name)
  const buf = await sharp(await readFile(file))
    .resize(maxWidth, null, { withoutEnlargement: true, kernel: "lanczos3" })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  await writeFile(file, buf)
  console.log(`Optimized ${name} (${buf.length} bytes)`)
}

async function optimizePng(name, maxWidth) {
  const file = path.join(imagesDir, name)
  const buf = await sharp(await readFile(file))
    .resize(maxWidth, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
  await writeFile(file, buf)
  console.log(`Optimized ${name} (${buf.length} bytes)`)
}

await optimizeJpeg("interior.jpeg", 2400)
await optimizePng("on-the-menu.png", 1600)
await optimizePng("og.png", 1200)
