import * as cheerio from 'cheerio'

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
// Explicit aliases keep saved presets stable across wiki page disambiguation.
const creatureIdAliases = {
  'bulwark-snow-elf-hota': 'bulwark-snow-elf',
  'bulwark-mammoth-hota': 'bulwark-mammoth',
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/\(([^)]+)\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function numberFrom(value) {
  const match = String(value).replace(/,/g, '').trim().match(/^\d+$/)
  if (!match) throw new Error(`Missing numeric value: ${value}`)
  return Number.parseInt(match[0], 10)
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
  if (lower.includes('no melee')) {
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

export function parseCreatures(html) {
  const $ = cheerio.load(html)
  const creatures = []

  const table = $('table').filter((_, node) => {
    const headings = $(node).find('th')
    const headers = headings.text() + headings.find('[title]').map((_, span) => $(span).attr('title')).get().join(' ')
    return /attack/i.test(headers) && /defen/i.test(headers) && /health|hit points|hp/i.test(headers)
  }).first()
  if (!table.length) throw new Error('Creature table headers missing')
  table.find('tr')
    .each((_, row) => {
      // Keep Complete-only units; within shared rows select one view, never concatenate numbers.
      const completeOnly = $(row).hasClass('onlysod')
      $(row).find(completeOnly ? '.onlyhota' : '.onlysod').remove()
      const cells = $(row).find('td')
      if (!cells.length) return
      if (cells.length < 14) throw new Error('Creature row has missing columns')
      const name = cells.eq(0).find('a').first().attr('title')
      if (!name) throw new Error('Creature name missing')

      const factionName = cells.eq(1).find('span[title]').first().attr('title') ?? 'Neutral'
      const faction = slug(factionName)
      const level = cells.eq(2).text().trim()
      const special = cells.eq(13).text().trim().replace(/\s+/g, ' ')
      const shotsMatch = special.match(/Ranged \((\d+) shots\)/i)
      const rulesets = completeOnly ? ['complete'] : $(row).hasClass('onlyhota') ? ['hota'] : rulesetsForFaction(faction, name)
      const sourceId = faction === 'neutral' ? slug(name) : `${slug(factionName)}-${slug(name)}`
      const id = creatureIdAliases[sourceId] ?? sourceId

      creatures.push({
        id,
        faction,
        tier: numberFrom(level.replace(/\++$/, '')),
        upgraded: level.includes('+'),
        rulesets,
        name: { en: name, pl: name },
        stats: {
          attack: numberFrom(cells.eq(3).text()),
          defense: numberFrom(cells.eq(4).text()),
          minDamage: numberFrom(cells.eq(5).text()),
          maxDamage: numberFrom(cells.eq(6).text()),
          health: numberFrom(cells.eq(7).text()),
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

  if (!creatures.length) throw new Error('Empty creature table')
  return creatures
}


export function parsePrimaryStats(html) {
  const $ = cheerio.load(html)
  $('.onlysod').remove()
  const text = $('body').text().replace(/\s+/g, ' ')
  return Object.fromEntries(Object.entries({attack: 'Attack', defense: 'Defense', spellPower: 'Spell Power', knowledge: 'Knowledge'}).map(([key, label]) => {
    const match = text.match(new RegExp(label + '\\s+(\\d+)\\s+\\d+%'))
    if (!match) throw new Error(`Missing primary stat: ${label}`)
    return [key, Number(match[1])]
  }))
}

export function parseHeroRows(html) {
  const $ = cheerio.load(html)
  const result = []
  const counts = new Map()
  $('table').first().find('tr').each((_, row) => {
    // Retain the original ID convention, including legacy combined display names.
    const legacyName = $(row).find('td').first().text().trim()
    const completeOnly = $(row).hasClass('onlysod')
    $(row).find(completeOnly ? '.onlyhota' : '.onlysod').remove()
    const cells = $(row).find('td')
    if (!cells.length) return
    if (cells.length < 9) throw new Error('Hero row has missing columns')
    const name = cells.eq(0).text().trim()
    const className = cells.eq(1).text().trim()
    if (!name || !Object.hasOwn(classToFaction, className)) throw new Error(`Unknown hero class: ${className}`)
    const base = `${slug(className)}-${slug(legacyName)}`
    const duplicate = counts.get(base) ?? 0
    counts.set(base, duplicate + 1)
    const faction = classToFaction[className]
    result.push({id: duplicate ? `${base}-${duplicate + 1}` : base, faction, className,
      rulesets: completeOnly ? ['complete'] : $(row).hasClass('onlyhota') || hotaOnlyFactions.has(faction) ? ['hota'] : ['complete', 'hota'],
      name: {en: name, pl: name}, skills: [cells.eq(6).text().trim(), cells.eq(8).text().trim()].filter(Boolean),
      specialty: cells.eq(4).text().trim() || 'None'})
  })
  if (!result.length) throw new Error('Empty hero table')
  return result
}
