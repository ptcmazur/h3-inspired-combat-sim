import { afterEach, describe, expect, it, vi } from 'vitest'
import { fallbackPresetPayload, loadBattlePresets, parsePresetPayload } from './presets'
import publicPayload from '../../public/data/presets.v1.json'
import latest from '../../public/data/presets.latest.json'

const validPayload = {
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
        en: 'Simple early-game growth comparison.',
        pl: 'Proste porownanie przyrostu z poczatku gry.',
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
  ],
}

describe('battle preset data', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('validates the shipped catalog and keeps its fallback and pointer consistent', () => {
    expect(parsePresetPayload(publicPayload)).toEqual(publicPayload)
    expect(fallbackPresetPayload).toEqual(publicPayload)
    expect(latest.version).toBe(publicPayload.version)
    expect(latest.updatedAt).toBe(publicPayload.updatedAt)
    expect(latest.path).toBe('data/presets.v1.json')
  })

  it.each([
    { sideA: { ...validPayload.presets[0].sideA, creatureId: 'missing' } },
    { sideB: { ...validPayload.presets[0].sideB, heroId: 'missing' } },
    { ruleset: 'complete', sideA: { ...validPayload.presets[0].sideA, creatureId: 'cove-nymph' } },
    { ruleset: 'complete', sideB: { ...validPayload.presets[0].sideB, heroId: 'captain-corkes' } },
    { sideA: { ...validPayload.presets[0].sideA, count: 100000 } },
    { weeks: 53 }, { startDistance: 51 }, { simulationCount: 5001 },
    { simulationCount: 1.5 }, { startDistance: Infinity }, { weeks: NaN }, { id: '' },
  ])('rejects an unusable preset: %j', patch => {
    expect(parsePresetPayload({ ...validPayload, presets: [{ ...validPayload.presets[0], ...patch }] })).toBeNull()
  })

  it('rejects an empty catalog and duplicate IDs', () => {
    expect(parsePresetPayload({ ...validPayload, presets: [] })).toBeNull()
    expect(parsePresetPayload({ ...validPayload, presets: [validPayload.presets[0], validPayload.presets[0]] })).toBeNull()
  })

  it.each([
    { ok: false, json: async () => validPayload },
    { ok: true, json: async () => { throw new SyntaxError('Invalid JSON') } },
    { ok: true, json: async () => ({ ...validPayload, presets: [] }) },
    { ok: true, json: async () => ({ ...validPayload, presets: [{ ...validPayload.presets[0], sideA: { ...validPayload.presets[0].sideA, creatureId: 'missing' } }] }) },
  ])('uses the known bundled catalog when a remote response is unusable', async response => {
    expect(await loadBattlePresets(async () => response)).toEqual(fallbackPresetPayload)
  })

  it('parses a valid public preset payload', () => {
    const parsed = parsePresetPayload(validPayload)

    expect(parsed).not.toBeNull()
    expect(parsed?.version).toBe(1)
    expect(parsed?.presets[0].id).toBe('castle-vs-inferno-weekly')
    expect(parsed?.presets[0].sideA.count).toBe(84)
  })

  it('rejects malformed preset payloads', () => {
    expect(parsePresetPayload({ version: '1', updatedAt: '2026-06-01', presets: [] })).toBeNull()
    expect(parsePresetPayload({ ...validPayload, presets: [{ ...validPayload.presets[0], ruleset: 'sod' }] })).toBeNull()
    expect(parsePresetPayload({ ...validPayload, presets: [{ ...validPayload.presets[0], sideA: { creatureId: 'castle-pikeman' } }] })).toBeNull()
  })

  it('loads public presets from the versioned JSON endpoint', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validPayload,
    })

    const loaded = await loadBattlePresets(fetcher)

    expect(fetcher).toHaveBeenCalledWith('/data/presets.v1.json', { cache: 'force-cache' })
    expect(loaded.presets[0].id).toBe('castle-vs-inferno-weekly')
  })

  it('loads public presets under the configured deployment base path', async () => {
    vi.stubEnv('BASE_URL', '/h3-inspired-combat-sim/')
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => validPayload,
    })

    const loaded = await loadBattlePresets(fetcher)

    expect(fetcher).toHaveBeenCalledWith('/h3-inspired-combat-sim/data/presets.v1.json', {
      cache: 'force-cache',
    })
    expect(loaded).toEqual(validPayload)
  })

  it('falls back to bundled presets when the public preset file is unavailable', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network offline'))

    const loaded = await loadBattlePresets(fetcher)

    expect(loaded).toEqual(fallbackPresetPayload)
    expect(loaded.presets.length).toBeGreaterThan(0)
  })
})
