import type { Creature, Hero, Ruleset } from '../types'
import { creatures } from './creatures'
import { heroes } from './heroes'

export function getAvailableCreatures(ruleset: Ruleset): Creature[] {
  return creatures.filter((creature) => creature.rulesets.includes(ruleset))
}

export function getAvailableHeroes(ruleset: Ruleset): Hero[] {
  return heroes.filter((hero) => hero.rulesets.includes(ruleset))
}

export function groupCreaturesByFaction(creatureList: Creature[]): Record<string, Creature[]> {
  return creatureList.reduce<Record<string, Creature[]>>((groups, creature) => {
    groups[creature.faction] ??= []
    groups[creature.faction].push(creature)
    return groups
  }, {})
}

export function groupHeroesByFaction(heroList: Hero[]): Record<string, Hero[]> {
  return heroList.reduce<Record<string, Hero[]>>((groups, hero) => {
    groups[hero.faction] ??= []
    groups[hero.faction].push(hero)
    return groups
  }, {})
}
