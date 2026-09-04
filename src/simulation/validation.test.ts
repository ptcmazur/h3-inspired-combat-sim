import { describe, expect, it } from 'vitest'
import { creatures } from '../data/creatures'
import { simulateMany, simulateOne } from './duel'
import type { BattleConfig } from '../types'

const config: BattleConfig = {
  ruleset: 'complete', language: 'en', seed: 42, simulations: 3, maxRounds: 1, startDistance: 12,
  sideA: { creature: creatures[0], count: 10, heroId: 'none' },
  sideB: { creature: creatures[1], count: 10, heroId: 'none' },
}

describe('simulation input validation', () => {
  it.each([0, -1, 1.5, NaN, Infinity, 5001])('rejects invalid simulation count %s', simulations => {
    expect(() => simulateMany({ ...config, simulations })).toThrow()
  })

  it.each([
    ['maxRounds', 0], ['maxRounds', 101], ['startDistance', -1], ['startDistance', 51],
    ['seed', -1], ['seed', Number.MAX_SAFE_INTEGER + 1],
  ] as const)('rejects invalid %s = %s in single battles', (field, value) => {
    expect(() => simulateOne({ ...config, [field]: value })).toThrow()
  })

  it.each([0, -1, 1.5, NaN, Infinity, 100000])('rejects invalid stack count %s', count => {
    expect(() => simulateOne({ ...config, sideA: { ...config.sideA, count } })).toThrow()
  })

  it('rejects unknown heroes instead of silently replacing them', () => {
    expect(() => simulateOne({ ...config, sideA: { ...config.sideA, heroId: 'missing' } })).toThrow()
  })

  it('rejects a creature unavailable in the selected ruleset', () => {
    expect(() => simulateOne({ ...config, sideA: {
      ...config.sideA, creature: creatures.find(c => c.id === 'cove-nymph')!,
    } })).toThrow()
  })

  it('accepts boundary parameters and retains deterministic totals', () => {
    const result = simulateMany({ ...config, seed: 0, startDistance: 0 })
    expect(result.total).toBe(3)
    expect(result.sideA.wins + result.sideB.wins + result.draws).toBe(3)
    expect(simulateMany({ ...config, seed: 0, startDistance: 0 })).toEqual(result)
  })
})
