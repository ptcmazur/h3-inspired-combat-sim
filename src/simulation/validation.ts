import { heroes } from '../data/heroes'
import type { BattleConfig, Language } from '../types'

export const limits = {
  simulations: [1, 5000], count: [1, 99999], weeks: [1, 52],
  startDistance: [0, 50], maxRounds: [1, 100], seed: [0, 4294967295],
} as const

export type NumericField = keyof typeof limits

export function isValidNumber(value: number, field: NumericField): boolean {
  const [min, max] = limits[field]
  return Number.isSafeInteger(value) && value >= min && value <= max
}

export function numberError(value: number, field: NumericField, language: Language): string | null {
  if (isValidNumber(value, field)) return null
  const names = {
    en: { simulations: 'Simulations', count: 'Quantity', weeks: 'Weeks', startDistance: 'Start distance', maxRounds: 'Round limit', seed: 'Seed' },
    pl: { simulations: 'Symulacje', count: 'Liczebność', weeks: 'Tygodnie', startDistance: 'Dystans startowy', maxRounds: 'Limit rund', seed: 'Seed' },
  }
  const [min, max] = limits[field]
  return language === 'pl'
    ? `${names.pl[field]}: wpisz liczbę całkowitą od ${min} do ${max}.`
    : `${names.en[field]}: enter a whole number from ${min} to ${max}.`
}

export function validateBattleConfig(config: BattleConfig): string[] {
  const language = config.language === 'pl' ? 'pl' : 'en'
  const errors: string[] = []
  for (const field of ['simulations', 'seed', 'maxRounds', 'startDistance'] as const) {
    const error = numberError(config[field], field, language)
    if (error) errors.push(error)
  }
  if (!['complete', 'hota'].includes(config.ruleset)) errors.push(language === 'pl' ? 'Nieznany zestaw zasad.' : 'Unknown ruleset.')
  for (const [label, side] of [['A', config.sideA], ['B', config.sideB]] as const) {
    const error = numberError(side.count, 'count', language)
    if (error) errors.push(`${label}: ${error}`)
    const hero = heroes.find(h => h.id === side.heroId)
    if (!hero?.rulesets.includes(config.ruleset) || !side.creature.rulesets.includes(config.ruleset)) {
      errors.push(language === 'pl' ? `${label}: jednostka lub bohater niedostępny w tym zestawie zasad.` : `${label}: creature or hero unavailable in this ruleset.`)
    }
    const stats = side.creature.stats
    if (Object.values(stats).some(v => !Number.isSafeInteger(v) || v < 0) || stats.health < 1 || stats.minDamage > stats.maxDamage) {
      errors.push(language === 'pl' ? `${label}: nieprawidłowe statystyki jednostki.` : `${label}: invalid creature stats.`)
    }
  }
  return errors
}

export function assertBattleConfig(config: BattleConfig): void {
  const errors = validateBattleConfig(config)
  if (errors.length) throw new RangeError(errors.join(' '))
}
