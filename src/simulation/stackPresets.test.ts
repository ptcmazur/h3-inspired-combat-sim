import { describe, expect, it } from 'vitest'
import { calculateEqualGoldStacks, calculateWeeklyGrowthStacks } from './stackPresets'
import type { Creature } from '../types'

function creature(id: string, growth: number, cost: number): Creature {
  return {
    id,
    faction: 'neutral',
    tier: 1,
    upgraded: false,
    rulesets: ['complete', 'hota'],
    name: { en: id, pl: id },
    stats: {
      attack: 1,
      defense: 1,
      minDamage: 1,
      maxDamage: 1,
      health: 1,
      speed: 1,
      growth,
      aiValue: 1,
      cost,
    },
    abilities: [],
    notes: [],
  }
}

describe('stack presets', () => {
  it('sets both sides by weekly growth', () => {
    const result = calculateWeeklyGrowthStacks(creature('a', 14, 60), creature('b', 7, 200), 6)

    expect(result).toEqual({ sideA: 84, sideB: 42 })
  })

  it('finds an equal-gold budget at or above both six-week minimum stacks', () => {
    const result = calculateEqualGoldStacks(creature('a', 14, 60), creature('b', 7, 200), 6)

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.sideA).toBeGreaterThanOrEqual(84)
    expect(result.sideB).toBeGreaterThanOrEqual(42)
    expect(result.sideA * 60).toBe(result.sideB * 200)
    expect(result.budget).toBe(8400)
  })

  it('returns a disabled state when either creature has no gold cost', () => {
    const result = calculateEqualGoldStacks(creature('a', 14, 0), creature('b', 7, 200), 6)

    expect(result).toEqual({
      ok: false,
      reason: 'missing-cost',
    })
  })
})
