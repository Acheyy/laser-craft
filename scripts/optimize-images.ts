// Generates the web images in public/img from the originals in images/originals.
// Run after adding or replacing an original: `bun run images`
import sharp from 'sharp'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '..')
const ORIGINALS = path.join(ROOT, 'images/originals')
const PUBLIC_IMG = path.join(ROOT, 'public/img')
const WIDTHS = [400, 800, 1200]

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
        .webp({ quality: 78 })
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
await responsive('services')
await openGraph()
await icons()
await writeFile(
  path.join(ROOT, 'src/data/images.gen.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)
console.log(`Generated ${Object.keys(manifest).length} responsive images`)
