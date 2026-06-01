import * as cheerio from 'cheerio'
import { mkdir, writeFile } from 'node:fs/promises'

const ROOT = new URL('../', import.meta.url)
const DATA_DIR = new URL('src/data/', ROOT)

const classToFaction = {
  Knight: 'castle',
  Cleric: 'castle',
  Ranger: 'rampart',
  Druid: 'rampart',
  Alchemist: 'tower',
  Wizard: 'tower',
  Demoniac: 'inferno',
  Heretic: 'inferno',
  'Death Knight': 'necropolis',
  Necromancer: 'necropolis',
  Overlord: 'dungeon',
  Warlock: 'dungeon',
  Barbarian: 'stronghold',
  'Battle Mage': 'stronghold',
  Beastmaster: 'fortress',
  Witch: 'fortress',
  Planeswalker: 'conflux',
  Elementalist: 'conflux',
  Captain: 'cove',
  Navigator: 'cove',
  Mercenary: 'factory',
  Artificer: 'factory',
  Chieftain: 'bulwark',
  Elder: 'bulwark',
}

const hotaOnlyFactions = new Set(['cove', 'factory', 'bulwark'])
const hotaOnlyNeutralCreatures = new Set(['Leprechaun', 'Satyr', 'Steel Golem', 'Fangarm'])

function slug(value) {
  return value
    .toLowerCase()
    .replace(/\(([^)]+)\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function numberFrom(value, fallback = 0) {
  const match = String(value).replace(/,/g, '').match(/\d+/)
  return match ? Number(match[0]) : fallback
}

function normalizeAbility(text) {
  const lower = text.toLowerCase()
  const abilities = new Set()

  if (lower.includes('ranged')) abilities.add('ranged')
  if (lower.includes('no enemy retaliation') || lower.includes('no retaliation')) {
    abilities.add('noRetaliation')
  }
  if (lower.includes('double attack') || lower.includes('attacks twice')) {
    abilities.add('doubleAttack')
  }
  if (lower.includes('no melee') || lower.includes('no range')) {
    abilities.add('noMeleePenalty')
  }
  if (lower.includes('flying')) abilities.add('flying')

  return [...abilities]
}

function rulesetsForFaction(faction, name) {
  if (hotaOnlyFactions.has(faction)) return ['hota']
  if (faction === 'neutral' && hotaOnlyNeutralCreatures.has(name)) return ['hota']
  return ['complete', 'hota']
}

async function fetchPage(path) {
  const response = await fetch(`https://heroes.thelazy.net/index.php/${path}`)
  if (!response.ok) throw new Error(`Could not fetch ${path}: ${response.status}`)
  return response.text()
}

async function buildCreatures() {
  const html = await fetchPage('List_of_creatures')
  const $ = cheerio.load(html)
  const creatures = []

  $('table tr')
    .slice(2)
    .each((_, row) => {
      const cells = $(row).find('td')
      const name = cells.eq(0).find('a').first().attr('title')
      if (!name) return

      const factionName = cells.eq(1).find('span[title]').first().attr('title') ?? 'Neutral'
      const faction = slug(factionName)
      const level = cells.eq(2).text().trim()
      const special = cells.eq(13).text().trim().replace(/\s+/g, ' ')
      const shotsMatch = special.match(/Ranged \((\d+) shots\)/i)
      const rulesets = rulesetsForFaction(faction, name)
      const id = faction === 'neutral' ? slug(name) : `${slug(factionName)}-${slug(name)}`

      creatures.push({
        id,
        faction,
        tier: numberFrom(level, 0),
        upgraded: level.includes('+'),
        rulesets,
        name: { en: name, pl: name },
        stats: {
          attack: numberFrom(cells.eq(3).text()),
          defense: numberFrom(cells.eq(4).text()),
          minDamage: numberFrom(cells.eq(5).text()),
          maxDamage: numberFrom(cells.eq(6).text()),
          health: numberFrom(cells.eq(7).text(), 1),
          speed: numberFrom(cells.eq(8).text()),
          growth: numberFrom(cells.eq(9).text()),
          aiValue: numberFrom(cells.eq(10).text()),
          cost: numberFrom(cells.eq(11).text()),
        },
        abilities: normalizeAbility(special),
        notes: special ? special.split(',').map((part) => part.trim()).filter(Boolean) : [],
        ...(shotsMatch ? { shots: Number(shotsMatch[1]) } : {}),
        spriteKey: id,
      })
    })

  return creatures
}

async function primaryForClass(className) {
  try {
    const html = await fetchPage(className.replaceAll(' ', '_'))
    const $ = cheerio.load(html)
    const text = $('body').text().replace(/\s+/g, ' ')
    return {
      attack: numberFrom(text.match(/Attack\s+(\d+)\s+\d+%/)?.[1]),
      defense: numberFrom(text.match(/Defense\s+(\d+)\s+\d+%/)?.[1]),
      spellPower: numberFrom(text.match(/Spell Power\s+(\d+)\s+\d+%/)?.[1]),
      knowledge: numberFrom(text.match(/Knowledge\s+(\d+)\s+\d+%/)?.[1]),
    }
  } catch {
    return { attack: 0, defense: 0, spellPower: 0, knowledge: 0 }
  }
}

async function buildHeroes() {
  const html = await fetchPage('Heroes')
  const $ = cheerio.load(html)
  const classNames = [
    ...new Set(
      $('table')
        .first()
        .find('tr')
        .slice(1)
        .map((_, row) => $(row).find('td').eq(1).text().trim())
        .get()
        .filter(Boolean),
    ),
  ]
  const primaryByClass = Object.fromEntries(
    await Promise.all(classNames.map(async (className) => [className, await primaryForClass(className)])),
  )
  const heroes = [
    {
      id: 'none',
      faction: 'neutral',
      className: 'None',
      rulesets: ['complete', 'hota'],
      name: { en: 'No hero', pl: 'Bez bohatera' },
      primary: { attack: 0, defense: 0, spellPower: 0, knowledge: 0 },
      skills: [],
      specialty: 'None',
    },
  ]
  const heroIdCounts = new Map()

  $('table')
    .first()
    .find('tr')
    .slice(1)
    .each((_, row) => {
      const cells = $(row).find('td')
      const name = cells.eq(0).text().trim()
      const className = cells.eq(1).text().trim()
      if (!name || !className) return

      const faction = classToFaction[className] ?? 'neutral'
      const skills = [cells.eq(6).text().trim(), cells.eq(8).text().trim()].filter(Boolean)
      const specialty = cells.eq(4).text().trim() || 'None'
      const baseId = `${slug(className)}-${slug(name)}`
      const duplicateCount = heroIdCounts.get(baseId) ?? 0
      heroIdCounts.set(baseId, duplicateCount + 1)
      const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`

      heroes.push({
        id,
        faction,
        className,
        rulesets: hotaOnlyFactions.has(faction) ? ['hota'] : ['complete', 'hota'],
        name: { en: name, pl: name },
        primary: primaryByClass[className] ?? { attack: 0, defense: 0, spellPower: 0, knowledge: 0 },
        skills,
        specialty,
      })
    })

  return heroes
}

function emitArray(name, typeName, records) {
  return `import type { ${typeName} } from '../types'\n\nexport const ${name}: ${typeName}[] = ${JSON.stringify(
    records,
    null,
    2,
  )}\n`
}

await mkdir(DATA_DIR, { recursive: true })
const [creatures, heroes] = await Promise.all([buildCreatures(), buildHeroes()])
await writeFile(new URL('creatures.ts', DATA_DIR), emitArray('creatures', 'Creature', creatures))
await writeFile(new URL('heroes.ts', DATA_DIR), emitArray('heroes', 'Hero', heroes))
console.log(`Generated ${creatures.length} creatures and ${heroes.length} heroes.`)
