import type { Creature, Hero } from '../types'

type CreatureOverride = Partial<Omit<Creature, 'id' | 'name' | 'stats'>> & {
  name?: Partial<Creature['name']>
  stats?: Partial<Creature['stats']>
}
type HeroOverride = Partial<Omit<Hero, 'id' | 'name' | 'primary'>> & {
  name?: Partial<Hero['name']>
  primary?: Partial<Hero['primary']>
}

// Edit this file, not generated creatures.ts/heroes.ts. Arrays replace the whole field.
export const creatureOverrides: Record<string, CreatureOverride> = {}
export const heroOverrides: Record<string, HeroOverride> = {
  none: { name: { pl: 'Bez bohatera' } },
}
