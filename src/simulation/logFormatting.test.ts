import { describe, expect, it } from 'vitest'
import { formatBattleEvent, formatDamageBreakdown } from './logFormatting'
import { simulateOne } from './duel'
import { creatures } from '../data/creatures'
import type { BattleConfig, BattleLogEntry } from '../types'

const config: BattleConfig = {
  ruleset: 'complete', language: 'en', seed: 42, simulations: 1, maxRounds: 1, startDistance: 0,
  sideA: { creature: { ...creatures[0], stats: { ...creatures[0].stats, attack: 1, defense: 1, health: 100, speed: 9, minDamage: 10, maxDamage: 10 } }, count: 2, heroId: 'none' },
  sideB: { creature: { ...creatures[0], stats: { ...creatures[0].stats, attack: 1, defense: 1, health: 100, speed: 2, minDamage: 1, maxDamage: 1 } }, count: 2, heroId: 'none' },
}

describe('battle explanations', () => {
  it('records enough numeric data to reproduce damage and casualties', () => {
    const event = simulateOne(config).log.find(e => e.phase === 'attack')!
    expect(event.data?.damage).toMatchObject({
      base: 20, attack: 1, defense: 1, attackMultiplier: 1, meleeMultiplier: 1,
      luckMultiplier: 1, amount: 20, killed: 0, remaining: 2, kind: 'melee',
    })
    expect(formatDamageBreakdown(event.data!.damage!, 'pl')).toContain('20')
  })

  it('renders the same event in either language without parsing its English message', () => {
    const event: BattleLogEntry = {
      round: 1, side: 'A', phase: 'move', message: 'not a translation source',
      data: { actor: { en: 'Pikeman', pl: 'Pikinier' }, steps: 3, distance: 5 },
    }
    expect(formatBattleEvent(event, 'pl')).toContain('Pikinier przesuwa się o 3')
    expect(formatBattleEvent(event, 'en')).toContain('Pikeman moves 3')
    expect(formatBattleEvent(event, 'pl')).toContain('5')
  })

  it('keeps combat and random draws identical when the selected language changes', () => {
    expect(simulateOne({ ...config, language: 'pl' })).toEqual(simulateOne(config))
  })
})
