import type {
  BattlePreset,
  BattlePresetPayload,
  BattlePresetSide,
  LocalizedText,
  Ruleset,
} from '../types'

const PRESET_PATH = 'data/presets.v1.json'

type PresetFetch = (
  url: string,
  init: { cache: RequestCache },
) => Promise<{ ok: boolean; json: () => Promise<unknown> }>

export const fallbackPresetPayload: BattlePresetPayload = {
  version: 1,
  updatedAt: '2026-06-01',
  presets: [
    {
      id: 'castle-vs-inferno-weekly',
      label: {
        en: 'Castle weekly growth vs Inferno weekly growth',
        pl: 'Tygodniowy przyrost Castle kontra Inferno',
      },
      description: {
        en: 'Six weeks of Pikemen against six weeks of Imps.',
        pl: 'Szesc tygodni pikinierow przeciwko szesciu tygodniom impow.',
      },
      ruleset: 'hota',
      sideA: {
        creatureId: 'castle-pikeman',
        count: 84,
        heroId: 'none',
      },
      sideB: {
        creatureId: 'inferno-imp',
        count: 90,
        heroId: 'none',
      },
      weeks: 6,
      startDistance: 12,
      simulationCount: 100,
    },
    {
      id: 'angel-vs-devil',
      label: {
        en: 'Angel vs Devil duel',
        pl: 'Pojedynek aniola z diablem',
      },
      description: {
        en: 'Small high-tier melee duel with equal stack sizes.',
        pl: 'Maly pojedynek jednostek wysokiego tieru z rowna liczebnoscia.',
      },
      ruleset: 'hota',
      sideA: {
        creatureId: 'castle-angel',
        count: 7,
        heroId: 'none',
      },
      sideB: {
        creatureId: 'inferno-devil',
        count: 7,
        heroId: 'none',
      },
      weeks: 1,
      startDistance: 12,
      simulationCount: 100,
    },
    {
      id: 'cove-nymphs-vs-pikemen',
      label: {
        en: 'Cove Nymphs vs Castle Pikemen',
        pl: 'Nimfy Cove kontra pikinierzy Castle',
      },
      description: {
        en: 'HotA-only faction matchup for checking ruleset availability.',
        pl: 'Pojedynek frakcji HotA do sprawdzania dostepnosci zestawu zasad.',
      },
      ruleset: 'hota',
      sideA: {
        creatureId: 'cove-nymph',
        count: 144,
        heroId: 'none',
      },
      sideB: {
        creatureId: 'castle-pikeman',
        count: 84,
        heroId: 'none',
      },
      weeks: 6,
      startDistance: 12,
      simulationCount: 100,
    },
  ],
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRuleset(value: unknown): value is Ruleset {
  return value === 'complete' || value === 'hota'
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
}

function parseLocalizedText(value: unknown): LocalizedText | null {
  if (!isRecord(value) || typeof value.en !== 'string' || typeof value.pl !== 'string') {
    return null
  }

  return {
    en: value.en,
    pl: value.pl,
  }
}

function parsePresetSide(value: unknown): BattlePresetSide | null {
  if (!isRecord(value)) return null

  if (
    typeof value.creatureId !== 'string' ||
    typeof value.heroId !== 'string' ||
    !isPositiveInteger(value.count)
  ) {
    return null
  }

  return {
    creatureId: value.creatureId,
    count: value.count,
    heroId: value.heroId,
  }
}

function parsePreset(value: unknown): BattlePreset | null {
  if (!isRecord(value)) return null

  const label = parseLocalizedText(value.label)
  const description = value.description === undefined ? undefined : parseLocalizedText(value.description)
  const sideA = parsePresetSide(value.sideA)
  const sideB = parsePresetSide(value.sideB)

  if (
    typeof value.id !== 'string' ||
    !label ||
    description === null ||
    !isRuleset(value.ruleset) ||
    !sideA ||
    !sideB ||
    !isPositiveInteger(value.weeks) ||
    !isNonNegativeInteger(value.startDistance) ||
    !isPositiveInteger(value.simulationCount)
  ) {
    return null
  }

  return {
    id: value.id,
    label,
    description,
    ruleset: value.ruleset,
    sideA,
    sideB,
    weeks: value.weeks,
    startDistance: value.startDistance,
    simulationCount: value.simulationCount,
  }
}

export function parsePresetPayload(value: unknown): BattlePresetPayload | null {
  if (
    !isRecord(value) ||
    !isPositiveInteger(value.version) ||
    typeof value.updatedAt !== 'string' ||
    !Array.isArray(value.presets)
  ) {
    return null
  }

  const presets = value.presets.map(parsePreset)
  if (presets.some((preset) => preset === null)) return null

  return {
    version: value.version,
    updatedAt: value.updatedAt,
    presets: presets as BattlePreset[],
  }
}

export async function loadBattlePresets(
  fetcher: PresetFetch | undefined = typeof fetch === 'function' ? fetch.bind(globalThis) : undefined,
): Promise<BattlePresetPayload> {
  if (!fetcher) return fallbackPresetPayload

  try {
    const response = await fetcher(`${import.meta.env.BASE_URL}${PRESET_PATH}`, { cache: 'force-cache' })
    if (!response.ok) return fallbackPresetPayload

    return parsePresetPayload(await response.json()) ?? fallbackPresetPayload
  } catch {
    return fallbackPresetPayload
  }
}
