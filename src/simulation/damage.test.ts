import { describe, expect, it } from 'vitest'
import {
  applyDamageToStack,
  attackDefenseMultiplier,
  luckChance,
  moraleChance,
  rollBaseDamage,
} from './damage'
import type { Creature } from '../types'

const pikeman: Creature = {
  id: 'pikeman',
  faction: 'castle',
  tier: 1,
  upgraded: false,
  rulesets: ['complete', 'hota'],
  name: { en: 'Pikeman', pl: 'Pikeman' },
  stats: {
    attack: 4,
    defense: 5,
    minDamage: 1,
    maxDamage: 3,
    health: 10,
    speed: 4,
    growth: 14,
    aiValue: 80,
    cost: 60,
  },
  abilities: [],
  notes: [],
}

describe('damage math', () => {
  it('caps attack-defense bonuses and penalties like HoMM3', () => {
    expect(attackDefenseMultiplier(20, 10)).toBe(1.5)
    expect(attackDefenseMultiplier(80, 10)).toBe(4)
    expect(attackDefenseMultiplier(10, 50)).toBe(0.3)
  })

  it('rolls one damage value per unit up to ten units, then scales the ten-roll sample', () => {
    const onesThenThrees = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    let index = 0
    const rng = () => onesThenThrees[index++ % onesThenThrees.length]

    expect(rollBaseDamage(pikeman, 5, rng)).toBe(5)
    index = 0
    expect(rollBaseDamage(pikeman, 25, rng)).toBe(30)
  })

  it('applies damage through the wounded top creature in a stack', () => {
    expect(
      applyDamageToStack({ count: 5, topHealth: 10, creature: pikeman }, 12),
    ).toMatchObject({ count: 4, topHealth: 8 })

    expect(
      applyDamageToStack({ count: 4, topHealth: 1, creature: pikeman }, 1),
    ).toMatchObject({ count: 3, topHealth: 10 })
  })

  it('maps morale and luck ratings to documented probabilities', () => {
    expect(luckChance(3, 'complete')).toBeCloseTo(1 / 8)
    expect(luckChance(-3, 'complete')).toBe(0)
    expect(luckChance(-3, 'hota')).toBeCloseTo(1 / 4)
    expect(moraleChance(3)).toBeCloseTo(1 / 8)
    expect(moraleChance(-3)).toBeCloseTo(1 / 4)
  })
})
