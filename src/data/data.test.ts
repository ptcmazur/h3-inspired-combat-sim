import { describe, expect, it } from 'vitest'
import { creatures } from './creatures'
import { heroes } from './heroes'
import { getAvailableCreatures, getAvailableHeroes } from './selectors'

describe('HoMM3 data', () => {
  it('keeps Complete and HotA hero variants separate without swapping their skills', () => {
    const pairs = ['ranger-ufretin', 'ranger-clancy', 'druid-uland', 'alchemist-fafner',
      'demoniac-ignatius', 'death-knight-straker', 'overlord-ajit', 'warlock-deemer',
      'barbarian-krellion', 'battle-mage-saurug', 'beastmaster-bron']
    for (const id of pairs) {
      expect(heroes.find(hero => hero.id === id)?.rulesets).toEqual(['complete'])
      expect(heroes.find(hero => hero.id === `${id}-2`)?.rulesets).toEqual(['hota'])
      expect(getAvailableHeroes('hota').some(hero => hero.id === id)).toBe(false)
      expect(getAvailableHeroes('complete').some(hero => hero.id === `${id}-2`)).toBe(false)
    }
    expect(heroes.find(hero => hero.id === 'ranger-ufretin')?.skills).toContain('Basic Resistance')
    expect(heroes.find(hero => hero.id === 'ranger-ufretin-2')?.skills).toContain('Basic Interference')
  })

  it('restricts neutral Halfling and the four HotA heroes to their source rulesets', () => {
    expect(creatures.find(creature => creature.id === 'halfling')?.rulesets).toEqual(['complete'])
    expect(creatures.find(creature => creature.id === 'factory-halfling-factory')?.rulesets).toEqual(['hota'])
    for (const id of ['knight-beatrice', 'ranger-giselle', 'death-knight-ranloo', 'witch-kinkeria']) {
      expect(getAvailableHeroes('complete').some(hero => hero.id === id)).toBe(false)
      expect(getAvailableHeroes('hota').some(hero => hero.id === id)).toBe(true)
    }
  })

  it('uses a single wiki variant in shared notes and keeps established renamed IDs', () => {
    expect(creatures.find(creature => creature.id === 'conflux-firebird')?.notes).toEqual(['Flying', 'Breath attack', '50% Fire resistance'])
    expect(creatures.find(creature => creature.id === 'inferno-arch-devil')?.notes).toContain('Luck -2')
    for (const id of ['tower-stone-gargoyle', 'tower-obsidian-gargoyle']) {
      expect(creatures.find(creature => creature.id === id)?.notes).toEqual(['Bloodless', 'Flying'])
    }
    expect(creatures.find(creature => creature.id === 'bulwark-snow-elf')?.name.en).toBe('Snow Elf (HotA)')
    expect(creatures.find(creature => creature.id === 'bulwark-mammoth')?.name.en).toBe('Mammoth (HotA)')
    expect(heroes.find(hero => hero.id === 'death-knight-haart-lichlord-haart')?.name.en).toBe('Haart Lich')
    expect(heroes.find(hero => hero.id === 'none')?.name.pl).toBe('Bez bohatera')
  })

  it('keeps creature and hero IDs unique for unambiguous selection', () => {
    expect(new Set(creatures.map(c => c.id)).size).toBe(creatures.length)
    expect(new Set(heroes.map(h => h.id)).size).toBe(heroes.length)
  })
  it('contains full-size Complete and HotA creature sets with required stats', () => {
    expect(getAvailableCreatures('complete').length).toBeGreaterThanOrEqual(140)
    expect(getAvailableCreatures('hota').length).toBeGreaterThanOrEqual(170)

    for (const creature of creatures) {
      expect(creature.id).toMatch(/^[a-z0-9-]+$/)
      expect(creature.name.en).toBeTruthy()
      expect(creature.name.pl).toBeTruthy()
      expect(creature.rulesets.length).toBeGreaterThan(0)
      expect(creature.stats.health).toBeGreaterThan(0)
      expect(creature.stats.speed).toBeGreaterThanOrEqual(0)
      expect(creature.stats.minDamage).toBeGreaterThanOrEqual(0)
      expect(creature.stats.maxDamage).toBeGreaterThanOrEqual(creature.stats.minDamage)
    }
  })

  it('contains a full-size hero set plus the explicit no-hero option', () => {
    expect(heroes.some((hero) => hero.id === 'none')).toBe(true)
    expect(getAvailableHeroes('hota').length).toBeGreaterThanOrEqual(150)

    for (const hero of heroes) {
      expect(hero.id).toMatch(/^[a-z0-9-]+$/)
      expect(hero.name.en).toBeTruthy()
      expect(hero.name.pl).toBeTruthy()
      expect(hero.rulesets.length).toBeGreaterThan(0)
      expect(hero.primary.attack).toBeGreaterThanOrEqual(0)
      expect(hero.primary.defense).toBeGreaterThanOrEqual(0)
    }
  })

  it('hides HotA-only records in Complete mode', () => {
    expect(getAvailableCreatures('complete').some((creature) => creature.faction === 'cove')).toBe(false)
    expect(getAvailableCreatures('hota').some((creature) => creature.faction === 'cove')).toBe(true)
    expect(getAvailableHeroes('complete').some((hero) => hero.faction === 'factory')).toBe(false)
    expect(getAvailableHeroes('hota').some((hero) => hero.faction === 'factory')).toBe(true)
  })
})
