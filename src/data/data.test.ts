import { describe, expect, it } from 'vitest'
import { creatures } from './creatures'
import { heroes } from './heroes'
import { getAvailableCreatures, getAvailableHeroes } from './selectors'

describe('HoMM3 data', () => {
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
