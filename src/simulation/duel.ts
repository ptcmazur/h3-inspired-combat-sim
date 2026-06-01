import type {
  BattleConfig,
  BattleLogEntry,
  BattleLogPhase,
  BattleResult,
  BattleSideId,
  Creature,
  Hero,
  SimulationSummary,
  StackState,
} from '../types'
import { heroes } from '../data/heroes'
import {
  applyDamageToStack,
  attackDefenseMultiplier,
  luckChance,
  moraleChance,
  rollBaseDamage,
} from './damage'
import { createSeededRandom, type RandomSource } from './rng'

interface RuntimeSide {
  id: BattleSideId
  stack: StackState
  hero: Hero
  retaliatedThisRound: boolean
  shotsLeft: number
}

interface BattleRuntime {
  distance: number
  firstAttacker?: BattleSideId
}

function getHero(heroId: string): Hero {
  return heroes.find((hero) => hero.id === heroId) ?? heroes[0]
}

function stackName(stack: StackState): string {
  return stack.creature.name.en
}

function sideLabel(side: RuntimeSide): string {
  return `${side.id} ${stackName(side.stack)}`
}

function attackValue(side: RuntimeSide): number {
  return side.stack.creature.stats.attack + side.hero.primary.attack
}

function defenseValue(side: RuntimeSide): number {
  return side.stack.creature.stats.defense + side.hero.primary.defense
}

function signedMorale(hero: Hero): number {
  const leadership = hero.skills.find((skill) => skill.includes('Leadership'))
  if (!leadership) return 0
  if (leadership.startsWith('Expert')) return 3
  if (leadership.startsWith('Advanced')) return 2
  return 1
}

function signedLuck(hero: Hero): number {
  const luck = hero.skills.find((skill) => skill.includes('Luck'))
  if (!luck) return 0
  if (luck.startsWith('Expert')) return 3
  if (luck.startsWith('Advanced')) return 2
  return 1
}

function logEvent(
  log: BattleLogEntry[],
  round: number,
  phase: BattleLogPhase,
  message: string,
  side?: BattleSideId,
): void {
  log.push({ round, phase, message, ...(side ? { side } : {}) })
}

function isRanged(side: RuntimeSide): boolean {
  return side.stack.creature.abilities.includes('ranged')
}

function canAttack(side: RuntimeSide, distance: number): boolean {
  return distance <= 0 || (isRanged(side) && side.shotsLeft > 0)
}

function dealDamage(
  attacker: RuntimeSide,
  defender: RuntimeSide,
  config: BattleConfig,
  rng: RandomSource,
  log: BattleLogEntry[],
  round: number,
  retaliating = false,
): void {
  const baseDamage = rollBaseDamage(attacker.stack.creature, attacker.stack.count, rng)
  const multiplier = attackDefenseMultiplier(attackValue(attacker), defenseValue(defender))
  let damage = Math.max(1, Math.floor(baseDamage * multiplier))
  const luck = signedLuck(attacker.hero)
  const luckRoll = rng()

  if (luck > 0 && luckRoll < luckChance(luck, config.ruleset)) {
    damage *= 2
    logEvent(log, round, 'luck', `${stackName(attacker.stack)} lands lucky damage.`, attacker.id)
  }

  defender.stack = applyDamageToStack(defender.stack, damage)
  logEvent(
    log,
    round,
    retaliating ? 'retaliation' : 'attack',
    `${stackName(attacker.stack)} ${retaliating ? 'retaliates against' : 'attacks'} ${stackName(
      defender.stack,
    )} for ${damage} damage; ${defender.stack.count} remain.`,
    attacker.id,
  )
}

function registerFirstAttack(
  attacker: RuntimeSide,
  runtime: BattleRuntime,
  log: BattleLogEntry[],
  round: number,
): void {
  if (runtime.firstAttacker) return
  runtime.firstAttacker = attacker.id
  logEvent(log, round, 'firstAttack', `${stackName(attacker.stack)} attacks first.`, attacker.id)
}

function performAttack(
  attacker: RuntimeSide,
  defender: RuntimeSide,
  config: BattleConfig,
  rng: RandomSource,
  log: BattleLogEntry[],
  round: number,
  runtime: BattleRuntime,
): void {
  if (attacker.stack.count <= 0 || defender.stack.count <= 0) return

  registerFirstAttack(attacker, runtime, log, round)

  if (runtime.distance > 0 && isRanged(attacker) && attacker.shotsLeft > 0) {
    attacker.shotsLeft -= 1
    logEvent(
      log,
      round,
      'attack',
      `${stackName(attacker.stack)} shoots from ${runtime.distance} steps away; ${
        attacker.shotsLeft
      } shots left.`,
      attacker.id,
    )
  }

  const attacks = attacker.stack.creature.abilities.includes('doubleAttack') ? 2 : 1
  const preventsRetaliation = attacker.stack.creature.abilities.includes('noRetaliation')

  if (attacks > 1) {
    logEvent(
      log,
      round,
      'doubleAttack',
      `${stackName(attacker.stack)} uses double attack.`,
      attacker.id,
    )
  }

  if (preventsRetaliation) {
    logEvent(
      log,
      round,
      'noRetaliation',
      `${stackName(attacker.stack)} prevents retaliation.`,
      attacker.id,
    )
  }

  for (let strike = 0; strike < attacks; strike += 1) {
    dealDamage(attacker, defender, config, rng, log, round)
    if (defender.stack.count <= 0) return
  }

  if (!preventsRetaliation && !defender.retaliatedThisRound && defender.stack.count > 0) {
    defender.retaliatedThisRound = true
    dealDamage(defender, attacker, config, rng, log, round, true)
  }
}

function moveTowardOpponent(
  side: RuntimeSide,
  runtime: BattleRuntime,
  log: BattleLogEntry[],
  round: number,
): void {
  if (runtime.distance <= 0) return

  const steps = Math.min(side.stack.creature.stats.speed, runtime.distance)
  runtime.distance -= steps
  logEvent(
    log,
    round,
    'move',
    `${stackName(side.stack)} moves ${steps} steps; ${runtime.distance} left to opponent.`,
    side.id,
  )
}

function performTurn(
  active: RuntimeSide,
  target: RuntimeSide,
  config: BattleConfig,
  rng: RandomSource,
  log: BattleLogEntry[],
  round: number,
  runtime: BattleRuntime,
): void {
  if (active.stack.count <= 0 || target.stack.count <= 0) return

  if (!canAttack(active, runtime.distance)) {
    moveTowardOpponent(active, runtime, log, round)
  }

  if (canAttack(active, runtime.distance)) {
    performAttack(active, target, config, rng, log, round, runtime)
  }
}

function sideOrder(sideA: RuntimeSide, sideB: RuntimeSide): RuntimeSide[] {
  if (sideA.stack.creature.stats.speed === sideB.stack.creature.stats.speed) return [sideA, sideB]
  return sideA.stack.creature.stats.speed > sideB.stack.creature.stats.speed
    ? [sideA, sideB]
    : [sideB, sideA]
}

function moraleExtraTurn(side: RuntimeSide, rng: RandomSource): boolean {
  const morale = signedMorale(side.hero)
  return morale > 0 && rng() < moraleChance(morale)
}

export function simulateOne(config: BattleConfig): BattleResult {
  const rng = createSeededRandom(config.seed)
  const sideA: RuntimeSide = {
    id: 'A',
    stack: {
      creature: config.sideA.creature,
      count: config.sideA.count,
      topHealth: config.sideA.creature.stats.health,
    },
    hero: getHero(config.sideA.heroId),
    retaliatedThisRound: false,
    shotsLeft: config.sideA.creature.shots ?? 0,
  }
  const sideB: RuntimeSide = {
    id: 'B',
    stack: {
      creature: config.sideB.creature,
      count: config.sideB.count,
      topHealth: config.sideB.creature.stats.health,
    },
    hero: getHero(config.sideB.heroId),
    retaliatedThisRound: false,
    shotsLeft: config.sideB.creature.shots ?? 0,
  }
  const runtime: BattleRuntime = { distance: Math.max(0, Math.floor(config.startDistance)) }
  const log: BattleLogEntry[] = []
  let rounds = 0

  while (sideA.stack.count > 0 && sideB.stack.count > 0 && rounds < config.maxRounds) {
    rounds += 1
    sideA.retaliatedThisRound = false
    sideB.retaliatedThisRound = false

    const order = sideOrder(sideA, sideB)
    logEvent(
      log,
      rounds,
      'roundStart',
      `Round ${rounds} starts. Turn order: ${order.map(sideLabel).join(', ')}.`,
    )

    for (const active of order) {
      const target = active.id === 'A' ? sideB : sideA
      performTurn(active, target, config, rng, log, rounds, runtime)
      if (target.stack.count <= 0 || active.stack.count <= 0) break

      if (moraleExtraTurn(active, rng)) {
        logEvent(
          log,
          rounds,
          'morale',
          `${stackName(active.stack)} receives good morale and acts again.`,
          active.id,
        )
        performTurn(active, target, config, rng, log, rounds, runtime)
        if (target.stack.count <= 0 || active.stack.count <= 0) break
      }
    }

    logEvent(log, rounds, 'roundEnd', `Round ${rounds} ends at ${runtime.distance} distance.`)
  }

  const winner =
    sideA.stack.count <= 0 && sideB.stack.count <= 0
      ? 'draw'
      : sideA.stack.count > 0
        ? 'A'
        : sideB.stack.count > 0
          ? 'B'
          : 'draw'

  return {
    winner,
    rounds,
    sideA: sideA.stack,
    sideB: sideB.stack,
    firstAttacker: runtime.firstAttacker,
    finalDistance: runtime.distance,
    log,
  }
}

export function simulateMany(config: BattleConfig): SimulationSummary {
  let sideAWins = 0
  let sideBWins = 0
  let draws = 0
  let sideASurvivors = 0
  let sideBSurvivors = 0
  let sample: BattleResult | undefined

  for (let index = 0; index < config.simulations; index += 1) {
    const result = simulateOne({ ...config, seed: config.seed + index })
    sample ??= result

    if (result.winner === 'A') sideAWins += 1
    if (result.winner === 'B') sideBWins += 1
    if (result.winner === 'draw') draws += 1

    sideASurvivors += result.sideA.count
    sideBSurvivors += result.sideB.count
  }

  const total = Math.max(1, config.simulations)

  return {
    total: config.simulations,
    draws,
    sideA: {
      wins: sideAWins,
      winRate: sideAWins / total,
      averageSurvivors: sideASurvivors / total,
    },
    sideB: {
      wins: sideBWins,
      winRate: sideBWins / total,
      averageSurvivors: sideBSurvivors / total,
    },
    sample: sample ?? simulateOne(config),
  }
}

export function hasCoreAbility(creature: Creature, ability: Creature['abilities'][number]): boolean {
  return creature.abilities.includes(ability)
}
