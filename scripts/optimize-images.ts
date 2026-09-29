// Generates the web images in public/img from the originals in images/originals.
// Run after adding or replacing an original: `bun run images`
//
// Rename on replace: when a published photo or share card changes visually,
// save the new original under a new name (-2, -3…) and update the references.
// Never put a different picture behind a live URL: /img is cached for 30 days
// by browsers and Cloudflare, and WhatsApp/Facebook cache link previews by
// image URL. Remove the old original but keep its files in public/img, so
// old shares and cached pages still resolve.
//
// The designed share cards come from scripts/og-cards (render.ts).
import sharp from 'sharp'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '..')
const ORIGINALS = path.join(ROOT, 'images/originals')
const PUBLIC_IMG = path.join(ROOT, 'public/img')
// 200w serves the 48–56px thumbnails (menu, /contact list, Christmas strip)
const WIDTHS = [200, 400, 800, 1200]
const WEBP = { quality: 78 }
// Photos whose detail (wood grain) makes them 2–3× their peers at the
// default quality; checked by eye at 1200w
const WEBP_OVERRIDES: Record<string, { quality: number; effort?: number }> = {
  'glob-craciun-lemn-nume-nicolas': { quality: 60, effort: 6 },
  'glob-craciun-lemn-nume-cristina-ren': { quality: 60, effort: 6 },
  'glob-craciun-lemn-straturi-craciun-fericit': { quality: 60, effort: 6 },
}

const manifest: Record<string, { width: number; height: number; widths: number[] }> = {}

async function responsive(folder: string) {
  const outDir = path.join(PUBLIC_IMG, folder)
  await mkdir(outDir, { recursive: true })
  for (const file of (await readdir(path.join(ORIGINALS, folder))).sort()) {
    const name = path.parse(file).name
    const source = sharp(path.join(ORIGINALS, folder, file)).rotate()
    const { width = 0, height = 0 } = await source.clone().metadata().then((m) =>
      // EXIF orientations 5-8 swap the axes
      (m.orientation ?? 1) >= 5 ? { width: m.height, height: m.width } : m,
    )
    const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))]
    for (const w of widths) {
      await source
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp(WEBP_OVERRIDES[name] ?? WEBP)
        .toFile(path.join(outDir, `${name}-${w}.webp`))
    }
    const largest = widths[widths.length - 1]
    manifest[`/img/${folder}/${name}`] = {
      width: largest,
      height: Math.round((height * largest) / width),
      widths,
    }
  }
}

async function openGraph() {
  const outDir = path.join(PUBLIC_IMG, 'og')
  await mkdir(outDir, { recursive: true })
  for (const file of await readdir(path.join(ORIGINALS, 'og'))) {
    await sharp(path.join(ORIGINALS, 'og', file))
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(outDir, `${path.parse(file).name}.jpg`))
  }
}

async function icons() {
  const logo = path.join(PUBLIC_IMG, 'logo.svg')
  const png = (size: number, pad: number) =>
    sharp(logo, { density: 600 })
      .resize(size - pad * 2, size - pad * 2)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#0f172a' })
      .flatten({ background: '#0f172a' })
      .png()
  await png(512, 48).toFile(path.join(PUBLIC_IMG, 'logo-512.png'))
  await png(180, 20).toFile(path.join(ROOT, 'public/apple-touch-icon.png'))
  await png(192, 20).toFile(path.join(ROOT, 'public/icon-192.png'))
}

await responsive('products')
await openGraph()
await icons()
await writeFile(
  path.join(ROOT, 'src/data/images.gen.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)
console.log(`Generated ${Object.keys(manifest).length} responsive images`)
