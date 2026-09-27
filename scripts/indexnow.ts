// Tells Bing, Yandex, Seznam, Naver (and the engines and assistants built on
// Bing's index) that pages changed. Run after each content deploy:
//
//   bun scripts/indexnow.ts                     every <loc> in public/sitemap.xml
//   bun scripts/indexnow.ts /placute-adresa /   only the given paths
//   bun scripts/indexnow.ts --dry-run [paths…]  print the request, send nothing
//
// The key is the name and content of public/<32 hex>.txt; the live copy of
// that file must already be deployed (checked before sending).
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '..')
const PUBLIC = path.join(ROOT, 'public')
const HOST = 'laser-craft.ro'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const STATUS: Record<number, string> = {
  200: 'OK, URLs submitted',
  202: 'Accepted, key validation pending',
  400: 'Bad request',
  403: 'Key not valid (key file missing or different on the live site)',
  422: `URLs don't belong to ${HOST} or the key doesn't match`,
  429: 'Too many requests, try again later',
}

async function readKey() {
  const files = (await readdir(PUBLIC)).filter((file) => /^[0-9a-f]{32}\.txt$/.test(file))
  if (files.length !== 1) {
    throw new Error(`Expected exactly one public/<32 hex>.txt key file, found ${files.length}`)
  }
  const key = path.parse(files[0]).name
  const content = (await readFile(path.join(PUBLIC, files[0]), 'utf8')).trim()
  if (content !== key) throw new Error(`public/${files[0]} must contain only the key`)
  return key
}

async function sitemapUrls() {
  const xml = await readFile(path.join(PUBLIC, 'sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
}

// Accepts '/servicii', 'servicii' or a full https://laser-craft.ro/… URL.
function toUrl(arg: string) {
  const url = new URL(arg, `${ORIGIN}/`)
  if (url.host !== HOST || url.protocol !== 'https:') {
    throw new Error(`Not a ${ORIGIN} URL: ${arg}`)
  }
  return url.href
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const paths = args.filter((arg) => arg !== '--dry-run')

const key = await readKey()
const keyLocation = `${ORIGIN}/${key}.txt`
const sitemap = await sitemapUrls()
const urlList = [...new Set(paths.length > 0 ? paths.map(toUrl) : sitemap)]
if (urlList.length === 0) throw new Error('No URLs to submit')
// Paths are submitted as typed; a URL outside the sitemap is usually a typo
// or a redirecting variant ('/Servicii', '/servicii/').
for (const url of urlList) {
  if (!sitemap.includes(url)) console.warn(`Warning: ${url} is not in public/sitemap.xml`)
}
const payload = { host: HOST, key, keyLocation, urlList }

if (dryRun) {
  console.log(`Dry run: would check ${keyLocation}, then POST to ${ENDPOINT}`)
  console.log(JSON.stringify(payload, null, 2))
  process.exit(0)
}

// Without the live key file every engine rejects the ping (403).
const live = await fetch(keyLocation).then(async (res) =>
  res.ok ? (await res.text()).trim() : `HTTP ${res.status}`,
)
if (live !== key) {
  console.error(`${keyLocation} returned "${live.slice(0, 80)}", not the key. Deploy public/ first.`)
  process.exit(1)
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
})
console.log(`IndexNow: HTTP ${res.status} ${STATUS[res.status] ?? res.statusText} (${urlList.length} URLs)`)
if (res.status !== 200 && res.status !== 202) {
  const body = await res.text()
  if (body) console.log(body.slice(0, 500))
  process.exit(1)
}
