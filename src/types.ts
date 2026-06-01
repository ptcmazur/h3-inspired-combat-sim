export type Ruleset = 'complete' | 'hota'
export type Language = 'en' | 'pl'
export type BattleSideId = 'A' | 'B'

export type LocalizedText = Record<Language, string>

export type CreatureAbility =
  | 'ranged'
  | 'noRetaliation'
  | 'doubleAttack'
  | 'noMeleePenalty'
  | 'flying'

export interface CreatureStats {
  attack: number
  defense: number
  minDamage: number
  maxDamage: number
  health: number
  speed: number
  growth: number
  aiValue: number
  cost: number
}

export interface Creature {
  id: string
  faction: string
  tier: number
  upgraded: boolean
  rulesets: Ruleset[]
  name: LocalizedText
  stats: CreatureStats
  abilities: CreatureAbility[]
  notes: string[]
  shots?: number
  spriteKey?: string
}

export interface HeroPrimaryStats {
  attack: number
  defense: number
  spellPower: number
  knowledge: number
}

export interface Hero {
  id: string
  faction: string
  className: string
  rulesets: Ruleset[]
  name: LocalizedText
  primary: HeroPrimaryStats
  skills: string[]
  specialty: string
}

export interface BattleSideConfig {
  creature: Creature
  count: number
  heroId: string
}

export interface BattleConfig {
  ruleset: Ruleset
  language: Language
  simulations: number
  seed: number
  maxRounds: number
  startDistance: number
  sideA: BattleSideConfig
  sideB: BattleSideConfig
}

export interface BattlePresetSide {
  creatureId: string
  count: number
  heroId: string
}

export interface BattlePreset {
  id: string
  label: LocalizedText
  description?: LocalizedText
  ruleset: Ruleset
  sideA: BattlePresetSide
  sideB: BattlePresetSide
  weeks: number
  startDistance: number
  simulationCount: number
}

export interface BattlePresetPayload {
  version: number
  updatedAt: string
  presets: BattlePreset[]
}

export interface StackState {
  creature: Creature
  count: number
  topHealth: number
}

export type BattleLogPhase =
  | 'roundStart'
  | 'turnOrder'
  | 'move'
  | 'firstAttack'
  | 'attack'
  | 'luck'
  | 'retaliation'
  | 'noRetaliation'
  | 'doubleAttack'
  | 'morale'
  | 'roundEnd'

export interface BattleLogEntry {
  round: number
  side?: BattleSideId
  phase: BattleLogPhase
  message: string
}

export interface BattleResult {
  winner: BattleSideId | 'draw'
  rounds: number
  sideA: StackState
  sideB: StackState
  firstAttacker?: BattleSideId
  finalDistance: number
  log: BattleLogEntry[]
}

export interface SimulationSideSummary {
  wins: number
  winRate: number
  averageSurvivors: number
}

export interface SimulationSummary {
  total: number
  draws: number
  sideA: SimulationSideSummary
  sideB: SimulationSideSummary
  sample: BattleResult
}
