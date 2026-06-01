import type { Creature, Ruleset, StackState } from '../types'
import type { RandomSource } from './rng'

export function attackDefenseMultiplier(attack: number, defense: number): number {
  const difference = attack - defense

  if (difference >= 0) {
    return Math.min(4, 1 + difference * 0.05)
  }

  return Math.max(0.3, 1 + difference * 0.025)
}

export function rollBaseDamage(
  creature: Creature,
  count: number,
  rng: RandomSource,
): number {
  const { minDamage, maxDamage } = creature.stats
  if (count <= 0 || maxDamage <= 0) return 0

  const rolls = Math.min(count, 10)
  let sample = 0

  for (let index = 0; index < rolls; index += 1) {
    const roll = Math.min(0.999999999, Math.max(0, rng()))
    sample += minDamage + Math.floor(roll * (maxDamage - minDamage + 1))
  }

  if (count <= 10) return sample

  return Math.floor((sample / 10) * count)
}

export function applyDamageToStack(stack: StackState, damage: number): StackState {
  if (stack.count <= 0 || damage <= 0) return stack

  const health = stack.creature.stats.health
  const totalHealth = (stack.count - 1) * health + stack.topHealth
  const remainingHealth = Math.max(0, totalHealth - Math.floor(damage))

  if (remainingHealth <= 0) {
    return { ...stack, count: 0, topHealth: 0 }
  }

  const count = Math.ceil(remainingHealth / health)
  const remainder = remainingHealth % health
  return {
    ...stack,
    count,
    topHealth: remainder === 0 ? health : remainder,
  }
}

export function luckChance(luck: number, ruleset: Ruleset): number {
  if (luck > 0) return Math.min(3, luck) / 24
  if (luck < 0 && ruleset === 'hota') return Math.min(3, Math.abs(luck)) / 12
  return 0
}

export function moraleChance(morale: number): number {
  if (morale > 0) return Math.min(3, morale) / 24
  if (morale < 0) return Math.min(3, Math.abs(morale)) / 12
  return 0
}
