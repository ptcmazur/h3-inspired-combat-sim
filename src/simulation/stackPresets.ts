import type { Creature } from '../types'

export interface StackCounts {
  sideA: number
  sideB: number
}

export type EqualGoldStackResult =
  | (StackCounts & { ok: true; budget: number })
  | { ok: false; reason: 'missing-cost' }

function safeWeeks(weeks: number): number {
  return Math.max(1, Math.floor(weeks))
}

function gcd(a: number, b: number): number {
  let left = Math.abs(a)
  let right = Math.abs(b)

  while (right !== 0) {
    const next = left % right
    left = right
    right = next
  }

  return left
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

export function calculateWeeklyGrowthStacks(
  sideA: Creature,
  sideB: Creature,
  weeks: number,
): StackCounts {
  const normalizedWeeks = safeWeeks(weeks)

  return {
    sideA: sideA.stats.growth * normalizedWeeks,
    sideB: sideB.stats.growth * normalizedWeeks,
  }
}

export function calculateEqualGoldStacks(
  sideA: Creature,
  sideB: Creature,
  weeks: number,
): EqualGoldStackResult {
  if (sideA.stats.cost <= 0 || sideB.stats.cost <= 0) {
    return { ok: false, reason: 'missing-cost' }
  }

  const minimumCounts = calculateWeeklyGrowthStacks(sideA, sideB, weeks)
  const minimumBudget = Math.max(
    minimumCounts.sideA * sideA.stats.cost,
    minimumCounts.sideB * sideB.stats.cost,
  )
  const commonSpendStep = lcm(sideA.stats.cost, sideB.stats.cost)
  const budget = Math.ceil(minimumBudget / commonSpendStep) * commonSpendStep

  return {
    ok: true,
    sideA: budget / sideA.stats.cost,
    sideB: budget / sideB.stats.cost,
    budget,
  }
}
