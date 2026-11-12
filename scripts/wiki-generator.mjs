import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, open, unlink, rename, mkdtemp, copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { parseCreatures, parseHeroRows, parsePrimaryStats } from './wiki-parser.mjs'

const hash = text => createHash('sha256').update(text).digest('hex')
const catalogHash = text => hash(text.replaceAll('\r\n', '\n'))
async function optionalRead(path) {
  try { return await readFile(path, 'utf8') } catch (error) { if (error.code === 'ENOENT') return null; throw error }
}
const noHero = { id: 'none', faction: 'neutral', className: 'None', rulesets: ['complete', 'hota'], name: {en: 'No hero', pl: 'Bez bohatera'}, primary: {attack: 0, defense: 0, spellPower: 0, knowledge: 0}, skills: [], specialty: 'None' }
const abilityNames = ['ranged', 'noRetaliation', 'doubleAttack', 'noMeleePenalty', 'flying']

export function applyOverrides(records, overrides = {}) {
  const ids = new Set(records.map(record => record.id))
  for (const id of Object.keys(overrides)) if (!ids.has(id)) throw new Error(`Unknown override ID: ${id}`)
  return records.map(record => {
    const patch = overrides[record.id] ?? {}
    for (const key of Object.keys(patch)) {
      if (key === 'id' || !Object.hasOwn(record, key)) throw new Error(`Unsupported override field: ${record.id}.${key}`)
    }
    const merged = {...record, ...patch}
    for (const key of ['name', 'stats', 'primary']) {
      if (record[key]) {
        for (const field of Object.keys(patch[key] ?? {})) if (!Object.hasOwn(record[key], field)) throw new Error(`Unknown field ${key}.${field}`)
        merged[key] = {...record[key], ...patch[key]}
      }
    }
    return merged
  }).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
}

function validate(records, kind, minimum) {
  if (records.length < minimum) throw new Error(`Too few ${kind}: ${records.length}, expected at least ${minimum}`)
  if (new Set(records.map(record => record.id)).size !== records.length) throw new Error(`Duplicate ${kind} IDs`)
  const keys = kind === 'creatures' ? ['attack','defense','minDamage','maxDamage','health','speed','growth','aiValue','cost'] : ['attack','defense','spellPower','knowledge']
  for (const record of records) {
    if (!/^[a-z0-9-]+$/.test(record.id) || !record.name.en?.trim() || !record.name.pl?.trim()) throw new Error(`Invalid identity: ${record.id}`)
    if (!Array.isArray(record.rulesets) || !record.rulesets.length || record.rulesets.some(r => !['complete','hota'].includes(r))) throw new Error(`Invalid rulesets: ${record.id}`)
    const stats = kind === 'creatures' ? record.stats : record.primary
    if (keys.some(key => !Number.isSafeInteger(stats[key]) || stats[key] < 0)) throw new Error(`Invalid stats: ${record.id}`)
    if (kind === 'creatures') {
      if (stats.health < 1 || stats.minDamage > stats.maxDamage || !Number.isSafeInteger(record.tier) || record.tier < 1) throw new Error(`Invalid creature: ${record.id}`)
      if (!Array.isArray(record.abilities) || record.abilities.some(a => !abilityNames.includes(a))) throw new Error(`Invalid abilities: ${record.id}`)
      if (record.abilities.includes('ranged') && (!Number.isSafeInteger(record.shots) || record.shots < 1)) throw new Error(`Missing ammunition: ${record.id}`)
      if (!Array.isArray(record.notes) || record.notes.some(n => typeof n !== 'string')) throw new Error(`Invalid notes: ${record.id}`)
    } else if (!Array.isArray(record.skills) || record.skills.some(s => typeof s !== 'string') || typeof record.specialty !== 'string') throw new Error(`Invalid hero: ${record.id}`)
  }
}

function changes(before, after) {
  const previous = new Map(before.map(record => [record.id, record]))
  const next = new Set(after.map(record => record.id))
  return {
    added: after.filter(r => !previous.has(r.id)).map(r => r.id),
    removed: before.filter(r => !next.has(r.id)).map(r => r.id),
    changed: after.filter(r => previous.has(r.id) && !isDeepStrictEqual(previous.get(r.id), r)).map(r => r.id),
  }
}

export async function publishFiles(outputDir, files, replace = rename, expected) {
  await mkdir(outputDir, {recursive: true})
  const lockPath = join(outputDir, '.wiki-generation.lock')
  const lock = await open(lockPath, 'wx')
  try {
    if (expected) for (const [name, text] of Object.entries(expected)) {
      if (await optionalRead(join(outputDir, name)) !== text) throw new Error(`Catalog changed during generation: ${name}`)
    }
    const backupRoot = join(outputDir, '.wiki-backups')
    await mkdir(backupRoot, {recursive: true})
    const backup = await mkdtemp(join(backupRoot, 'generation-'))
    const original = {}
    // All backups and staged files must succeed before the first replacement.
    for (const [name, text] of Object.entries(files)) {
      original[name] = await optionalRead(join(outputDir, name))
      if (original[name] !== null) await writeFile(join(backup, `${name}.original`), original[name])
      await writeFile(join(backup, `${name}.new`), text)
    }
    const replaced = []
    try {
      for (const name of Object.keys(files)) {
        await replace(join(backup, `${name}.new`), join(outputDir, name))
        replaced.push(name)
      }
    } catch (error) {
      for (const name of replaced.reverse()) {
        if (original[name] === null) await unlink(join(outputDir, name))
        else await copyFile(join(backup, `${name}.original`), join(outputDir, name))
      }
      throw new Error(`Write failed; originals restored. Backups: ${backup}. ${error.message}`, {cause: error})
    }
    return backup
  } finally {
    await lock.close()
    await unlink(lockPath)
  }
}

export async function generateCatalog({outputDir, fetchPage, overrides = {}, write = false, minimums = {creatures: 140, heroes: 150}}) {
  const existing = Object.fromEntries(await Promise.all(['creatures.ts','heroes.ts','generation-report.json'].map(async name => [name, await optionalRead(join(outputDir, name))])))
  const previousReport = existing['generation-report.json'] && JSON.parse(existing['generation-report.json'])
  if (previousReport) for (const name of ['creatures.ts','heroes.ts']) {
    if (existing[name] === null || catalogHash(existing[name]) !== previousReport.outputs[name]) throw new Error(`Manual edit in ${name}; move corrections to overrides.ts before regenerating`)
  }
  const sources = []
  async function source(path) {
    const html = await fetchPage(path)
    sources.push({page: path, url: `https://heroes.thelazy.net/index.php/${path}`, retrievedAt: new Date().toISOString(), revision: html.match(/"wgRevisionId"\s*:\s*(\d+)/)?.[1] ?? null, sha256: hash(html)})
    return html
  }
  const rawCreatures = parseCreatures(await source('List_of_creatures'))
  const heroRows = parseHeroRows(await source('Heroes'))
  const primaryByClass = {}
  for (const className of [...new Set(heroRows.map(row => row.className))].sort()) {
    primaryByClass[className] = parsePrimaryStats(await source(className.replaceAll(' ', '_')))
  }
  const creatures = applyOverrides(rawCreatures, overrides.creatures)
  const heroes = applyOverrides([noHero, ...heroRows.map(hero => ({...hero, primary: primaryByClass[hero.className]}))], overrides.heroes)
  const report = {schemaVersion: 1, rulesetProfile: 'h3-sim-catalog-v1', gameVersions: {complete: 'unverified', hota: 'unverified'}, sources, counts: {creatures: creatures.length, heroes: heroes.length}, changes: {}, outputs: {}}
  const files = {}
  for (const [name, records] of Object.entries({creatures, heroes})) {
    validate(records, name, minimums[name])
    const previous = existing[`${name}.ts`] === null ? [] : JSON.parse(existing[`${name}.ts`].split(' = ').slice(1).join(' = '))
    report.changes[name] = changes(previous, records)
    if (report.changes[name].removed.length) throw new Error(`Source removed ${name} IDs: ${report.changes[name].removed.join(', ')}`)
    const type = name === 'creatures' ? 'Creature' : 'Hero'
    files[`${name}.ts`] = `import type { ${type} } from '../types'\n\nexport const ${name}: ${type}[] = ${JSON.stringify(records, null, 2)}\n`
    report.outputs[`${name}.ts`] = catalogHash(files[`${name}.ts`])
  }
  files['generation-report.json'] = JSON.stringify(report, null, 2) + '\n'
  if (write) report.backupDirectory = await publishFiles(outputDir, files, rename, existing)
  return report
}
