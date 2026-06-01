import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const publicPresetPayload = {
  version: 1,
  updatedAt: '2026-06-01',
  presets: [
    {
      id: 'test-castle-vs-cove',
      label: {
        en: 'Test Castle vs Cove',
        pl: 'Test Castle kontra Cove',
      },
      description: {
        en: 'Loaded from public JSON.',
        pl: 'Zaladowany z publicznego JSON.',
      },
      ruleset: 'hota',
      sideA: {
        creatureId: 'castle-angel',
        count: 7,
        heroId: 'knight-orrin',
      },
      sideB: {
        creatureId: 'cove-nymph',
        count: 144,
        heroId: 'none',
      },
      weeks: 6,
      startDistance: 9,
      simulationCount: 25,
    },
  ],
}

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with 100 simulations and exposes both combat sides', () => {
    render(<App />)

    expect(screen.getByRole('spinbutton', { name: /simulations/i })).toHaveValue(100)
    expect(screen.getByRole('spinbutton', { name: /weeks/i })).toHaveValue(6)
    expect(screen.getByRole('spinbutton', { name: /start distance/i })).toHaveValue(12)
    expect(screen.getByRole('heading', { name: /attacker/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /defender/i })).toBeInTheDocument()
  })

  it('switches interface language to Polish', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/language/i), 'pl')

    expect(screen.getByRole('heading', { name: /symulator pojedyn/i })).toBeInTheDocument()
  })

  it('runs a batch simulation and shows win-rate results', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /run simulation/i }))

    expect(screen.getAllByText(/win rate/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/average survivors/i).length).toBeGreaterThan(0)
    expect(screen.getByTestId('sticky-results')).toBeInTheDocument()
  })

  it('updates quantities with weekly growth and equal-gold presets', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /set by weekly growth/i }))

    const quantities = screen.getAllByRole('spinbutton', { name: /quantity/i })
    expect(quantities[0]).toHaveValue(84)
    expect(quantities[1]).toHaveValue(90)

    await user.click(screen.getByRole('button', { name: /set by equal gold/i }))

    expect(quantities[0]).toHaveValue(85)
    expect(quantities[1]).toHaveValue(102)
  })

  it('renders detailed log entries grouped by round', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /run simulation/i }))

    expect(screen.getByRole('heading', { name: /round 1/i })).toBeInTheDocument()
    expect(screen.getAllByText(/turn order/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/moves/i).length).toBeGreaterThan(0)
  })

  it('loads a public preset and applies it to both combat sides', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => publicPresetPayload,
      }),
    )
    render(<App />)

    await user.selectOptions(
      await screen.findByRole('combobox', { name: /public preset/i }),
      'test-castle-vs-cove',
    )
    await user.click(screen.getByRole('button', { name: /apply preset/i }))

    const quantities = screen.getAllByRole('spinbutton', { name: /quantity/i })
    expect(quantities[0]).toHaveValue(7)
    expect(quantities[1]).toHaveValue(144)
    expect(screen.getByRole('spinbutton', { name: /simulations/i })).toHaveValue(25)
    expect(screen.getByRole('spinbutton', { name: /start distance/i })).toHaveValue(9)
  })
})
