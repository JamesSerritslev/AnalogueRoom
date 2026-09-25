import sharp from "sharp"
import { readdirSync, statSync, writeFileSync, readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const downloads = "C:/Users/james/Downloads"
const imagesRoot = path.join(root, "public", "images")
const aboutDir = path.join(imagesRoot, "about")
const foodDir = path.join(imagesRoot, "food")

const MODE = process.argv.includes("--apply") ? "apply" : "match"

function list(dir, filterFn) {
  try {
    return readdirSync(dir)
      .filter(filterFn)
      .map((f) => path.join(dir, f))
  } catch {
    return []
  }
}

async function thumb(file) {
  const { data } = await sharp(file)
    .rotate()
    .resize(32, 32, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  return data
}

function dist(a, b) {
  let s = 0
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) s += Math.abs(a[i] - b[i])
  return s / n
}

/** Hero-class export: sharp web JPEG, max long edge. */
async function exportWebJpeg(srcPath, destPath, maxLongEdge) {
  const input = readFileSync(srcPath)
  const meta = await sharp(input).rotate().metadata()
  const long = Math.max(meta.width ?? 0, meta.height ?? 0)
  const pipeline = sharp(input).rotate()
  if (long > maxLongEdge) {
    const landscape = (meta.width ?? 0) >= (meta.height ?? 0)
    if (landscape) pipeline.resize(maxLongEdge, null, { kernel: "lanczos3" })
    else pipeline.resize(null, maxLongEdge, { kernel: "lanczos3" })
  }
  const buf = await pipeline
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer()
  writeFileSync(destPath, buf)
  const out = await sharp(buf).metadata()
  return {
    width: out.width,
    height: out.height,
    bytes: buf.length,
    srcLong: long,
  }
}

const originalFilter = (f) => {
  if (!/\.(jpe?g|png)$/i.test(f)) return false
  return /(Music and wine|Vinyl and wine|ANALOUGE)/i.test(f)
}

const originals = list(downloads, originalFilter)
const targets = [
  ...list(aboutDir, (f) => /\.jpe?g$/i.test(f)),
  ...list(foodDir, (f) => /\.jpe?g$/i.test(f)),
]

console.log(`Mode: ${MODE}`)
console.log(`Originals: ${originals.length}`)
console.log(`Targets: ${targets.length}`)

const oThumbs = []
for (const p of originals) {
  const m = await sharp(p).metadata()
  const t = await thumb(p)
  oThumbs.push({
    p,
    m,
    t,
    long: Math.max(m.width ?? 0, m.height ?? 0),
    kb: Math.round(statSync(p).size / 1024),
  })
}

const matches = []
const noMatch = []

for (const target of targets) {
  const tm = await sharp(target).metadata()
  const tt = await thumb(target)
  let best = null
  for (const o of oThumbs) {
    const d = dist(tt, o.t)
    if (!best || d < best.d) best = { ...o, d }
  }
  const rel = path.relative(imagesRoot, target).replace(/\\/g, "/")
  if (!best || best.d > 22) {
    noMatch.push({
      rel,
      size: `${tm.width}x${tm.height}`,
      best: best
        ? `${best.d.toFixed(1)} ${path.basename(best.p)}`
        : "none",
    })
    continue
  }
  matches.push({
    dest: target,
    rel,
    src: best.p,
    d: best.d,
    srcLong: best.long,
    current: `${tm.width}x${tm.height}`,
  })
}

console.log("\n=== MATCHES ===")
for (const m of matches.sort((a, b) => a.rel.localeCompare(b.rel))) {
  console.log(
    `${m.rel}\t${m.current}\t<- ${path.basename(m.src)}\t${m.srcLong}px\td=${m.d.toFixed(1)}`,
  )
}

console.log("\n=== NO MATCH ===")
for (const n of noMatch) {
  console.log(`${n.rel}\t${n.size}\tbest=${n.best}`)
}

if (MODE !== "apply") {
  console.log("\nDry run only. Re-run with --apply to write files.")
  process.exit(0)
}

console.log("\n=== EXPORTING ===")
const catalog = []
for (const m of matches) {
  // Full-bleed / hero-class keep 3840; content photos 2400 is enough for retina columns.
  const isHeroClass =
    /20-bar-wall|21-bar-crowd|22-dj-booth|24-bar-patrons|19-bar-full/i.test(
      m.rel,
    )
  const maxEdge = isHeroClass ? 3840 : 2400
  const out = await exportWebJpeg(m.src, m.dest, maxEdge)
  console.log(
    `${m.rel}: ${m.current} -> ${out.width}x${out.height} (${Math.round(out.bytes / 1024)}KB) from ${out.srcLong}px`,
  )
  catalog.push({
    rel: m.rel,
    width: out.width,
    height: out.height,
  })
}

writeFileSync(
  path.join(root, "scripts", ".image-optimize-catalog.json"),
  JSON.stringify(catalog, null, 2),
)
console.log("Wrote scripts/.image-optimize-catalog.json")
