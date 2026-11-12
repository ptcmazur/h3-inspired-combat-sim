import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { creatureOverrides, heroOverrides } from '../src/data/overrides.ts'
import { generateCatalog } from './wiki-generator.mjs'

const args = process.argv.slice(2)
if (args.some(arg => !['--write', '--help'].includes(arg))) throw new Error('Usage: node scripts/generate-wiki-data.mjs [--write] [--help]')
if (args.includes('--help')) {
  console.log('Default: fetch, validate and print a change report without modifying files. --write: additionally back up and replace the validated catalog. Requires Node 24+.')
} else {
  const report = await generateCatalog({
    outputDir: fileURLToPath(new URL('../src/data/', import.meta.url)),
    overrides: {creatures: creatureOverrides, heroes: heroOverrides},
    write: args.includes('--write'),
    fetchPage: async path => {
      // Be polite to the public wiki; a rate-limit response still aborts without writes.
      await delay(2000)
      const response = await fetch(`https://heroes.thelazy.net/index.php/${encodeURIComponent(path)}`, {signal: AbortSignal.timeout(20000)})
      if (!response.ok) throw new Error(`Could not fetch ${path}: HTTP ${response.status}`)
      return response.text()
    },
  })
  console.log(JSON.stringify(report, null, 2))
}
