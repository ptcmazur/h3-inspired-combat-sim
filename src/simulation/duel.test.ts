import { describe, expect, it } from 'vitest'
import { simulateMany, simulateOne } from './duel'
import type { BattleConfig, Creature } from '../types'

const slow: Creature = {
  id: 'slow',
  faction: 'neutral',
  tier: 1,
  upgraded: false,
  rulesets: ['complete', 'hota'],
  name: { en: 'Slow', pl: 'Slow' },
  stats: {
    attack: 1,
    defense: 1,
    minDamage: 1,
    maxDamage: 1,
    health: 5,
    speed: 2,
    growth: 1,
    aiValue: 1,
    cost: 1,
  },
  abilities: [],
  notes: [],
}

const fastNoRetaliation: Creature = {
  ...slow,
  id: 'fast-no-retaliation',
  name: { en: 'Fast No Retaliation', pl: 'Fast No Retaliation' },
  stats: { ...slow.stats, attack: 10, speed: 9 },
  abilities: ['noRetaliation'],
}

const doubleAttacker: Creature = {
  ...slow,
  id: 'double-attacker',
  name: { en: 'Double Attacker', pl: 'Double Attacker' },
  stats: { ...slow.stats, attack: 5, speed: 5 },
  abilities: ['doubleAttack'],
}

const baseConfig: BattleConfig = {
  ruleset: 'complete',
  language: 'en',
  simulations: 100,
  seed: 42,
  maxRounds: 50,
  startDistance: 0,
  sideA: { creature: fastNoRetaliation, count: 10, heroId: 'none' },
  sideB: { creature: slow, count: 2, heroId: 'none' },
}

describe('duel simulation', () => {
  const roundLimitedConfig: BattleConfig = {
    ...baseConfig,
    maxRounds: 1,
    sideA: { creature: slow, count: 100, heroId: 'none' },
    sideB: { creature: slow, count: 100, heroId: 'none' },
  }

  it('draws when both stacks survive the round limit', () => {
    const battle = simulateOne(roundLimitedConfig)

    expect(battle.rounds).toBe(1)
    expect(battle.sideA.count).toBeGreaterThan(0)
    expect(battle.sideB.count).toBeGreaterThan(0)
    expect(battle.winner).toBe('draw')
  })

  it('counts round-limited draws without awarding either side wins', () => {
    const summary = simulateMany({ ...roundLimitedConfig, simulations: 3 })

    expect(summary.total).toBe(3)
    expect(summary.draws).toBe(3)
    expect(summary.sideA.wins).toBe(0)
    expect(summary.sideB.wins).toBe(0)
    expect(summary.sideA.winRate).toBe(0)
    expect(summary.sideB.winRate).toBe(0)
    expect(summary.sideA.wins + summary.sideB.wins + summary.draws).toBe(summary.total)
  })

  it.each(['A', 'B'] as const)('preserves side %s victory on the final allowed round', (winner) => {
    const battle = simulateOne({
      ...baseConfig,
      maxRounds: 1,
      sideA: winner === 'A' ? baseConfig.sideA : baseConfig.sideB,
      sideB: winner === 'A' ? baseConfig.sideB : baseConfig.sideA,
    })

    expect(battle.rounds).toBe(1)
    expect(battle.winner).toBe(winner)
    expect(winner === 'A' ? battle.sideB.count : battle.sideA.count).toBe(0)
  })

  it('runs a seeded battle to a winner and records the first speed-based action', () => {
    const battle = simulateOne(baseConfig)

    expect(battle.winner).toBe('A')
    expect(battle.rounds).toBeGreaterThan(0)
    expect(battle.log[0]).toMatchObject({
      round: 1,
      phase: 'roundStart',
      message: 'Round 1 starts. Turn order: A Fast No Retaliation, B Slow.',
    })
    expect(battle.log.some((entry) => entry.message.includes('Fast No Retaliation attacks Slow'))).toBe(
      true,
    )
  })

  it('does not spend defender retaliation against no-retaliation attacks', () => {
    const battle = simulateOne(baseConfig)

    expect(battle.log.some((entry) => entry.phase === 'retaliation')).toBe(false)
    expect(battle.log.some((entry) => entry.phase === 'noRetaliation')).toBe(true)
  })

  it('applies double attack before the defender can act again', () => {
    const battle = simulateOne({
      ...baseConfig,
      sideA: { creature: doubleAttacker, count: 2, heroId: 'none' },
      sideB: { creature: slow, count: 2, heroId: 'none' },
    })

    const firstSlowAction = battle.log.findIndex((entry) => entry.message.includes('Slow attacks'))
    const doubleAttackActions = battle.log
      .slice(0, firstSlowAction === -1 ? battle.log.length : firstSlowAction)
      .filter((entry) => entry.message.includes('Double Attacker attacks Slow'))

    expect(doubleAttackActions).toHaveLength(2)
    expect(battle.log.some((entry) => entry.phase === 'doubleAttack')).toBe(true)
  })

  it('logs abstract movement by speed before melee contact', () => {
    const battle = simulateOne({
      ...baseConfig,
      startDistance: 12,
      sideA: { creature: fastNoRetaliation, count: 10, heroId: 'none' },
      sideB: { creature: slow, count: 20, heroId: 'none' },
    })

    expect(battle.log).toContainEqual(
      expect.objectContaining({
        round: 1,
        side: 'A',
        phase: 'move',
        message: 'Fast No Retaliation moves 9 steps; 3 left to opponent.',
      }),
    )
    expect(battle.log).toContainEqual(
      expect.objectContaining({
        round: 1,
        side: 'B',
        phase: 'move',
        message: 'Slow moves 2 steps; 1 left to opponent.',
      }),
    )
  })

  it('records the first attacker explicitly when contact or ranged attack happens', () => {
    const battle = simulateOne({
      ...baseConfig,
      startDistance: 1,
      sideA: { creature: fastNoRetaliation, count: 10, heroId: 'none' },
      sideB: { creature: slow, count: 20, heroId: 'none' },
    })

    expect(battle.firstAttacker).toBe('A')
    expect(battle.log).toContainEqual(
      expect.objectContaining({
        round: 1,
        side: 'A',
        phase: 'firstAttack',
        message: 'Fast No Retaliation attacks first.',
      }),
    )
  })

  it('separates each round with start and end entries', () => {
    const battle = simulateOne({
      ...baseConfig,
      startDistance: 20,
      sideA: { creature: fastNoRetaliation, count: 10, heroId: 'none' },
      sideB: { creature: slow, count: 20, heroId: 'none' },
    })

    const roundStarts = battle.log.filter((entry) => entry.phase === 'roundStart')
    const roundEnds = battle.log.filter((entry) => entry.phase === 'roundEnd')

    expect(roundStarts.length).toBeGreaterThan(1)
    expect(roundEnds.length).toBe(roundStarts.length)
    expect(roundStarts[1].round).toBe(2)
  })

  it('aggregates many complete fights with deterministic seeds', () => {
    const first = simulateMany({ ...baseConfig, simulations: 25 })
    const second = simulateMany({ ...baseConfig, simulations: 25 })

    expect(first).toEqual(second)
    expect(first.total).toBe(25)
    expect(first.sideA.winRate).toBe(1)
    expect(first.sideA.averageSurvivors).toBeGreaterThan(0)
  })
})
