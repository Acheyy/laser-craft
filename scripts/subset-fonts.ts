// Builds the self-hosted font subsets in src/assets/fonts from fonts-src/.
// Run after adding copy with characters beyond Romanian + basic punctuation:
// `bun scripts/subset-fonts.ts` (needs uv; fontTools runs through uvx).
//
// - inter-ro-wght.woff2: Inter 4.1, wght axis limited to 400-800, opsz pinned
//   at 14 (text size), body text and every non-heading element.
// - bricolage-ro-750.woff2: Bricolage Grotesque, static 750 / wdth 100 /
//   opsz 72 (the approved specimen), used for h1 and h2 only.
import { Glob } from 'bun'
import { copyFile, mkdtemp, readFile, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '..')
const OUT = path.join(ROOT, 'src/assets/fonts')
const FONTTOOLS = ['uvx', '--quiet', '--from', 'fonttools[woff]']

// Latin-1, Romanian (both comma-below and legacy cedilla ș/ț) and the
// typographic punctuation used in the copy (› is the breadcrumb separator).
const BASE_RANGES: Array<[number, number]> = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x102, 0x103],
  [0x15e, 0x15f],
  [0x162, 0x163],
  [0x218, 0x21b],
  [0x2013, 0x2014],
  [0x2018, 0x201e],
  [0x2022, 0x2022],
  [0x2026, 0x2026],
  [0x2039, 0x203a],
  [0x2192, 0x2192],
  [0x2248, 0x2248],
]

// Must survive every rebuild; the script fails if one goes missing.
const REQUIRED = 'ăâîșțĂÂÎȘȚ›≈×±²„”–—→'

const faces = [
  {
    source: 'fonts-src/inter/InterVariable.woff2',
    output: 'inter-ro-wght.woff2',
    axes: ['wght=400:800', 'opsz=14'],
    variable: true,
  },
  {
    source: 'fonts-src/bricolage-grotesque/BricolageGrotesque[opsz,wdth,wght].ttf',
    output: 'bricolage-ro-750.woff2',
    axes: ['wght=750', 'wdth=100', 'opsz=72'],
    variable: false,
  },
]

async function siteCodepoints() {
  const codepoints = new Set<number>()
  for (const [from, to] of BASE_RANGES) {
    for (let cp = from; cp <= to; cp++) codepoints.add(cp)
  }
  for await (const file of new Glob('src/**/*.{ts,tsx}').scan(ROOT)) {
    for (const char of await readFile(path.join(ROOT, file), 'utf8')) {
      const cp = char.codePointAt(0)!
      if (cp > 0x7e) codepoints.add(cp)
    }
  }
  return [...codepoints].sort((a, b) => a - b)
}

function run(args: string[]) {
  const result = Bun.spawnSync(args, { cwd: ROOT, stderr: 'pipe', stdout: 'pipe' })
  if (result.exitCode !== 0) {
    throw new Error(`${args.slice(0, 6).join(' ')} failed:\n${result.stderr}`)
  }
  return result.stdout.toString()
}

const codepoints = await siteCodepoints()
const unicodes = codepoints.map((cp) => cp.toString(16).padStart(4, '0')).join(',')
const tmp = await mkdtemp(path.join(tmpdir(), 'subset-fonts-'))

try {
  for (const face of faces) {
    const instance = path.join(tmp, `${path.parse(face.output).name}.ttf`)
    // Built and checked in the temp folder; src/assets/fonts only gets a file
    // that passed the checks below.
    const output = path.join(tmp, face.output)
    run([...FONTTOOLS, 'fonttools', 'varLib.instancer', face.source, ...face.axes, '-q', '-o', instance])
    run([
      ...FONTTOOLS,
      'pyftsubset',
      instance,
      `--unicodes=${unicodes}`,
      // pyftsubset's default OpenType features (kern, liga, locl, marks…)
      // only: the site uses no alternates or tabular figures, and keeping
      // them all ('*') makes the Inter file about 60% larger.
      '--name-IDs=0,1,2,3,4,5,6,13,14',
      '--flavor=woff2',
      `--output-file=${output}`,
    ])

    const report = run([
      ...FONTTOOLS,
      'python',
      '-c',
      `
import sys
from fontTools.ttLib import TTFont
font = TTFont(sys.argv[1])
cmap = font.getBestCmap()
axes = ' '.join(f'{a.axisTag} {a.minValue:g}-{a.maxValue:g}' for a in font['fvar'].axes) if 'fvar' in font else f"static {font['OS/2'].usWeightClass}"
missing = ''.join(c for c in sys.argv[2] if ord(c) not in cmap)
print(axes, len(cmap), missing, sep='|')
`,
      output,
      REQUIRED,
    ]).trim()
    const [axes, glyphs, missing] = report.split('|')
    const size = (await stat(output)).size
    console.log(`${face.output}: ${(size / 1024).toFixed(1)} KB, ${axes}, ${glyphs} characters`)
    if (missing) throw new Error(`${face.output} is missing ${missing}`)
    if (face.variable && axes !== 'wght 400-800') throw new Error(`${face.output}: unexpected axes ${axes}`)
    await copyFile(output, path.join(OUT, face.output))
  }
} finally {
  await rm(tmp, { recursive: true, force: true })
}
