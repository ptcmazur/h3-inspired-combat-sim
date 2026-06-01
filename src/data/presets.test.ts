import { describe, expect, it, vi } from 'vitest'
import { fallbackPresetPayload, loadBattlePresets, parsePresetPayload } from './presets'

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

  it('falls back to bundled presets when the public preset file is unavailable', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('network offline'))

    const loaded = await loadBattlePresets(fetcher)

    expect(loaded).toEqual(fallbackPresetPayload)
    expect(loaded.presets.length).toBeGreaterThan(0)
  })
})
