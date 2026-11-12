// @vitest-environment node
import { mkdtemp, readFile, writeFile, readdir, rm, rename } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { generateCatalog, publishFiles } from './wiki-generator.mjs'

const creatureHtml = await readFile(new URL('./fixtures/wiki-minimal.html', import.meta.url), 'utf8')
const heroHtml = '<table><tr><td>Test Hero</td><td>Knight</td><td></td><td></td><td>None</td><td></td><td>Basic Leadership</td><td></td><td></td></tr></table>'
const primaryHtml = '<body>Attack 2 30% Defense 2 30% Spell Power 1 20% Knowledge 1 20%</body>'
const fetchPage = async (path: string) => path === 'List_of_creatures' ? creatureHtml : path === 'Heroes' ? heroHtml : primaryHtml
const directories: string[] = []
afterEach(async () => { for (const path of directories.splice(0)) await rm(path, {recursive: true, force: true}) })
async function setup() {
  const outputDir = await mkdtemp(join(tmpdir(), 'h3-generator-'))
  directories.push(outputDir)
  return { outputDir, fetchPage, minimums: { creatures: 1, heroes: 2 }, overrides: {
    creatures: { 'castle-test-archer': {name: {pl: 'Łucznik testowy'}, stats: {health: 12}} },
    heroes: { 'knight-test-hero': {primary: {attack: 5}} },
  } }
}
describe('safe catalog regeneration', () => {
  it('previews without writing, then preserves nested corrections on repeated regeneration', async () => {
    const options = await setup()
    const preview = await generateCatalog(options)
    expect(await readdir(options.outputDir)).toEqual([])
    expect(preview.counts).toEqual({ creatures: 1, heroes: 2 })
    await generateCatalog({...options, write: true})
    const first = await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')
    expect(first).toContain('Łucznik testowy')
    expect(first).toContain('"health": 12')
    expect(first).toContain('"attack": 4')
    expect(await readFile(join(options.outputDir, 'heroes.ts'), 'utf8')).toContain('"attack": 5')
    const report = await generateCatalog({...options, write: true})
    expect(await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')).toBe(first)
    expect(report.changes.creatures).toEqual({added: [], removed: [], changed: []})
    expect(report.sources).toHaveLength(3)
    expect(report.sources[0].sha256).toMatch(/^[a-f0-9]{64}$/)
    // Git on Windows may check out generated text using CRLF.
    await writeFile(join(options.outputDir, 'creatures.ts'), first.replaceAll('\n', '\r\n'))
    await expect(generateCatalog(options)).resolves.toMatchObject({counts: {creatures: 1, heroes: 2}})
  })
  it('leaves both catalogs untouched when a class download fails', async () => {
    const options = await setup()
    await generateCatalog({...options, write: true})
    const before = await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')
    const heroesBefore = await readFile(join(options.outputDir, 'heroes.ts'), 'utf8')
    await expect(generateCatalog({...options, write: true, fetchPage: async (path: string) => {
      if (path === 'Knight') throw new Error('HTTP 503')
      return fetchPage(path)
    }})).rejects.toThrow('HTTP 503')
    expect(await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')).toBe(before)
    expect(await readFile(join(options.outputDir, 'heroes.ts'), 'utf8')).toBe(heroesBefore)
  })
  it('rejects unknown override IDs and invalid corrected values before writing', async () => {
    const options = await setup()
    await expect(generateCatalog({...options, write: true, overrides: {creatures: {missing: {name: {pl: 'Missing'}}}}})).rejects.toThrow()
    options.overrides.creatures['castle-test-archer'].stats.health = -1
    await expect(generateCatalog({...options, write: true})).rejects.toThrow()
    expect(await readdir(options.outputDir)).toEqual([])
  })
  it('rejects manual edits to generated files after a recorded generation', async () => {
    const options = await setup()
    await generateCatalog({...options, write: true})
    await writeFile(join(options.outputDir, 'creatures.ts'), 'manual edit')
    await expect(generateCatalog({...options, write: true})).rejects.toThrow(/manual/i)
    expect(await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')).toBe('manual edit')
  })
  it('restores both original files if the second replacement fails', async () => {
    const {outputDir} = await setup()
    await writeFile(join(outputDir, 'creatures.ts'), 'old creatures')
    await writeFile(join(outputDir, 'heroes.ts'), 'old heroes')
    let attempts = 0
    await expect(publishFiles(outputDir, {'creatures.ts': 'new creatures', 'heroes.ts': 'new heroes'}, async (from: string, to: string) => {
      if (++attempts === 2) throw new Error('disk failure')
      await rename(from, to)
    })).rejects.toThrow('disk failure')
    expect(await readFile(join(outputDir, 'creatures.ts'), 'utf8')).toBe('old creatures')
    expect(await readFile(join(outputDir, 'heroes.ts'), 'utf8')).toBe('old heroes')
  })
  it('blocks dropped IDs and duplicate rows before replacing either catalog', async () => {
    const options = await setup()
    await generateCatalog({...options, write: true})
    const before = await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')
    const renamedFetch = async (path: string) => (await fetchPage(path)).replaceAll('Test Archer', 'Renamed Archer')
    await expect(generateCatalog({...options, overrides: {}, fetchPage: renamedFetch, write: true})).rejects.toThrow(/removed creatures IDs/)
    const duplicateFetch = async (path: string) => path === 'List_of_creatures' ? creatureHtml.replace('</table>', creatureHtml.match(/<tr><td>[\s\S]*?<\/tr>/)![0] + '</table>') : fetchPage(path)
    await expect(generateCatalog({...options, fetchPage: duplicateFetch, write: true})).rejects.toThrow(/Duplicate/)
    expect(await readFile(join(options.outputDir, 'creatures.ts'), 'utf8')).toBe(before)
  })
  it('respects an existing lock and rejects files changed after the snapshot', async () => {
    const {outputDir} = await setup()
    await writeFile(join(outputDir, 'creatures.ts'), 'user edit')
    await expect(publishFiles(outputDir, {'creatures.ts': 'generated'}, undefined, {'creatures.ts': 'older snapshot'})).rejects.toThrow(/changed during generation/)
    await writeFile(join(outputDir, '.wiki-generation.lock'), 'another generator')
    await expect(publishFiles(outputDir, {'creatures.ts': 'generated'})).rejects.toThrow()
    expect(await readFile(join(outputDir, 'creatures.ts'), 'utf8')).toBe('user edit')
    expect(await readFile(join(outputDir, '.wiki-generation.lock'), 'utf8')).toBe('another generator')
  })
})
