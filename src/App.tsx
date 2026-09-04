import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { loadBattlePresets } from './data/presets'
import {
  getAvailableCreatures,
  getAvailableHeroes,
  groupCreaturesByFaction,
  groupHeroesByFaction,
} from './data/selectors'
import { abilityLabel, t } from './i18n'
import { simulateMany } from './simulation/duel'
import { NumberInput } from './components/NumberInput'
import { BattleLog } from './components/BattleLog'
import { isValidNumber, numberError, validateBattleConfig } from './simulation/validation'
import { calculateEqualGoldStacks, calculateWeeklyGrowthStacks } from './simulation/stackPresets'
import type {
  BattleConfig,
  BattlePresetPayload,
  Creature,
  Hero,
  Language,
  LocalizedText,
  Ruleset,
  SimulationSummary,
} from './types'

interface SideState {
  creatureId: string
  count: number
  heroId: string
  search: string
}

interface SidePanelProps {
  title: string
  language: Language
  side: SideState
  creatures: Creature[]
  heroes: Hero[]
  onChange: (side: SideState) => void
}

const factionLabels: Record<string, string> = {
  castle: 'Castle',
  rampart: 'Rampart',
  tower: 'Tower',
  inferno: 'Inferno',
  necropolis: 'Necropolis',
  dungeon: 'Dungeon',
  stronghold: 'Stronghold',
  fortress: 'Fortress',
  conflux: 'Conflux',
  cove: 'Cove',
  factory: 'Factory',
  bulwark: 'Bulwark',
  neutral: 'Neutral',
}

function formatPercent(value: number): string {
  return `${Math.round(value * 1000) / 10}%`
}

function formatNumber(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 })
}

function creatureLabel(creature: Creature, language: Language): string {
  const upgrade = creature.upgraded ? '+' : ''
  return `T${creature.tier}${upgrade} ${creature.name[language]}`
}

function findRecord<T extends { id: string }>(records: T[], id: string): T {
  return records.find((record) => record.id === id) ?? records[0]
}

function SidePanel({ title, language, side, creatures, heroes, onChange }: SidePanelProps) {
  const selectedCreature = findRecord(creatures, side.creatureId)
  const selectedHero = findRecord(heroes, side.heroId)
  const filteredCreatures = creatures.filter((creature) =>
    `${creature.name.en} ${creature.name.pl} ${creature.faction}`
      .toLowerCase()
      .includes(side.search.toLowerCase()),
  )
  const creatureGroups = groupCreaturesByFaction(filteredCreatures)
  const heroGroups = groupHeroesByFaction(heroes)

  return (
    <section className="side-panel" aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`}>{title}</h2>

      <label className="field">
        <span>{t(language, 'creature')}</span>
        <input
          type="search"
          value={side.search}
          onChange={(event) => onChange({ ...side, search: event.target.value })}
          placeholder={t(language, 'search')}
        />
      </label>

      <label className="field">
        <span>{t(language, 'creature')}</span>
        <select
          value={selectedCreature.id}
          onChange={(event) => onChange({ ...side, creatureId: event.target.value })}
        >
          {Object.entries(creatureGroups).map(([faction, group]) => (
            <optgroup key={faction} label={factionLabels[faction] ?? faction}>
              {group.map((creature) => (
                <option key={creature.id} value={creature.id}>
                  {creatureLabel(creature, language)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="field-row">
        <label className="field">
          <span>{t(language, 'quantity')}</span>
          <NumberInput
            field="count"
            value={side.count}
            onChange={count => onChange({ ...side, count })}
          />
        </label>

        <label className="field">
          <span>{t(language, 'hero')}</span>
          <select
            value={selectedHero.id}
            onChange={(event) => onChange({ ...side, heroId: event.target.value })}
          >
            {Object.entries(heroGroups).map(([faction, group]) => (
              <optgroup key={faction} label={factionLabels[faction] ?? faction}>
                {group.map((hero) => (
                  <option key={hero.id} value={hero.id}>
                    {hero.name[language]} {hero.className !== 'None' ? `(${hero.className})` : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <div className="unit-summary">
        <h3>{t(language, 'stats')}</h3>
        <dl>
          <div>
            <dt>ATK</dt>
            <dd>{selectedCreature.stats.attack + selectedHero.primary.attack}</dd>
          </div>
          <div>
            <dt>DEF</dt>
            <dd>{selectedCreature.stats.defense + selectedHero.primary.defense}</dd>
          </div>
          <div>
            <dt>DMG</dt>
            <dd>
              {selectedCreature.stats.minDamage}-{selectedCreature.stats.maxDamage}
            </dd>
          </div>
          <div>
            <dt>HP</dt>
            <dd>{selectedCreature.stats.health}</dd>
          </div>
          <div>
            <dt>SPD</dt>
            <dd>{selectedCreature.stats.speed}</dd>
          </div>
          <div>
            <dt>{t(language, 'growth')}</dt>
            <dd>{selectedCreature.stats.growth}</dd>
          </div>
          <div>
            <dt>{t(language, 'cost')}</dt>
            <dd>{selectedCreature.stats.cost}</dd>
          </div>
          <div>
            <dt>{t(language, 'shots')}</dt>
            <dd>{selectedCreature.shots ?? '-'}</dd>
          </div>
        </dl>

        <div className="badges" aria-label={t(language, 'abilities')}>
          {selectedCreature.abilities.length === 0 ? (
            <span className="muted">{t(language, 'none')}</span>
          ) : (
            selectedCreature.abilities.map((ability) => <span key={ability}>
              {abilityLabel(ability, language, selectedCreature.abilities.includes('ranged'))}
            </span>)
          )}
        </div>

        {selectedCreature.notes.length > 0 && (
          <details className="notes">
            <summary>{t(language, 'unsupported')}</summary>
            <p>{selectedCreature.notes.join(', ')}</p>
          </details>
        )}
      </div>
    </section>
  )
}

function Results({ language, summary }: { language: Language; summary: SimulationSummary | null }) {
  if (!summary) return null

  return (
    <section className="results-shell" aria-labelledby="results-heading">
      <div className="sticky-results" data-testid="sticky-results">
        <h2 id="results-heading">{t(language, 'results')}</h2>
        <div className="result-grid">
          <article>
            <h3>{t(language, 'attacker')}</h3>
            <p className="result-number">{formatPercent(summary.sideA.winRate)}</p>
            <dl>
              <div>
                <dt>{t(language, 'wins')}</dt>
                <dd>{summary.sideA.wins}</dd>
              </div>
              <div>
                <dt>{t(language, 'winRate')}</dt>
                <dd>{formatPercent(summary.sideA.winRate)}</dd>
              </div>
              <div>
                <dt>{t(language, 'averageSurvivors')}</dt>
                <dd>{formatNumber(summary.sideA.averageSurvivors)}</dd>
              </div>
            </dl>
          </article>

          <article>
            <h3>{t(language, 'defender')}</h3>
            <p className="result-number">{formatPercent(summary.sideB.winRate)}</p>
            <dl>
              <div>
                <dt>{t(language, 'wins')}</dt>
                <dd>{summary.sideB.wins}</dd>
              </div>
              <div>
                <dt>{t(language, 'winRate')}</dt>
                <dd>{formatPercent(summary.sideB.winRate)}</dd>
              </div>
              <div>
                <dt>{t(language, 'averageSurvivors')}</dt>
                <dd>{formatNumber(summary.sideB.averageSurvivors)}</dd>
              </div>
            </dl>
          </article>

          <article>
            <h3>{t(language, 'draws')}</h3>
            <p className="result-number">{summary.draws}</p>
            <p className="muted">{summary.total} {t(language, 'totalFights')}</p>
          </article>
        </div>
      </div>

      <BattleLog sample={summary.sample} total={summary.total} language={language} />
    </section>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [ruleset, setRuleset] = useState<Ruleset>('hota')
  const [simulations, setSimulations] = useState(100)
  const [seed, setSeed] = useState(1337)
  const [weeks, setWeeks] = useState(6)
  const [startDistance, setStartDistance] = useState(12)
  const creatures = useMemo(() => getAvailableCreatures(ruleset), [ruleset])
  const heroes = useMemo(() => getAvailableHeroes(ruleset), [ruleset])
  const [sideA, setSideA] = useState<SideState>({
    creatureId: 'castle-pikeman',
    count: 100,
    heroId: 'none',
    search: '',
  })
  const [sideB, setSideB] = useState<SideState>({
    creatureId: 'inferno-imp',
    count: 100,
    heroId: 'none',
    search: '',
  })
  const [summary, setSummary] = useState<SimulationSummary | null>(null)
  const [presetMessage, setPresetMessage] = useState<LocalizedText | null>(null)
  const [presetPayload, setPresetPayload] = useState<BattlePresetPayload | null>(null)
  const [selectedPresetId, setSelectedPresetId] = useState('')

  useEffect(() => {
    let active = true

    loadBattlePresets().then((payload) => {
      if (!active) return

      setPresetPayload(payload)
      setSelectedPresetId((currentId) =>
        currentId && payload.presets.some((preset) => preset.id === currentId)
          ? currentId
          : (payload.presets[0]?.id ?? ''),
      )
    })

    return () => {
      active = false
    }
  }, [])

  const normalizedSideA = {
    ...sideA,
    creatureId: creatures.some((creature) => creature.id === sideA.creatureId)
      ? sideA.creatureId
      : creatures[0].id,
    heroId: heroes.some((hero) => hero.id === sideA.heroId) ? sideA.heroId : 'none',
  }
  const normalizedSideB = {
    ...sideB,
    creatureId: creatures.some((creature) => creature.id === sideB.creatureId)
      ? sideB.creatureId
      : creatures[1].id,
    heroId: heroes.some((hero) => hero.id === sideB.heroId) ? sideB.heroId : 'none',
  }
  const selectedCreatureA = findRecord(creatures, normalizedSideA.creatureId)
  const selectedCreatureB = findRecord(creatures, normalizedSideB.creatureId)
  const equalGoldPreview = calculateEqualGoldStacks(selectedCreatureA, selectedCreatureB, weeks)
  const selectedPreset = presetPayload?.presets.find((preset) => preset.id === selectedPresetId)

  function updateSideA(next: SideState) {
    if (next.count !== sideA.count || next.creatureId !== sideA.creatureId || next.heroId !== sideA.heroId) setSummary(null)
    setSideA(next)
  }

  function updateSideB(next: SideState) {
    if (next.count !== sideB.count || next.creatureId !== sideB.creatureId || next.heroId !== sideB.heroId) setSummary(null)
    setSideB(next)
  }

  function applyWeeklyGrowthPreset() {
    if (!isValidNumber(weeks, 'weeks')) return
    const counts = calculateWeeklyGrowthStacks(selectedCreatureA, selectedCreatureB, weeks)
    setSideA({ ...normalizedSideA, count: counts.sideA })
    setSideB({ ...normalizedSideB, count: counts.sideB })
    setPresetMessage(null)
    setSummary(null)
  }

  function applyEqualGoldPreset() {
    if (!isValidNumber(weeks, 'weeks')) return
    const result = calculateEqualGoldStacks(selectedCreatureA, selectedCreatureB, weeks)
    if (!result.ok) {
      setPresetMessage({ en: t('en', 'equalGoldUnavailable'), pl: t('pl', 'equalGoldUnavailable') })
      return
    }

    setSideA({ ...normalizedSideA, count: result.sideA })
    setSideB({ ...normalizedSideB, count: result.sideB })
    setPresetMessage({ en: `${t('en', 'equalGoldBudget')}: ${result.budget}`, pl: `${t('pl', 'equalGoldBudget')}: ${result.budget}` })
    setSummary(null)
  }

  function applyPublicPreset() {
    if (!selectedPreset) return

    setRuleset(selectedPreset.ruleset)
    setSimulations(selectedPreset.simulationCount)
    setWeeks(selectedPreset.weeks)
    setStartDistance(selectedPreset.startDistance)
    setSideA({
      creatureId: selectedPreset.sideA.creatureId,
      count: selectedPreset.sideA.count,
      heroId: selectedPreset.sideA.heroId,
      search: '',
    })
    setSideB({
      creatureId: selectedPreset.sideB.creatureId,
      count: selectedPreset.sideB.count,
      heroId: selectedPreset.sideB.heroId,
      search: '',
    })
    setSummary(null)
    setPresetMessage({ en: `${t('en', 'presetApplied')}: ${selectedPreset.label.en}`, pl: `${t('pl', 'presetApplied')}: ${selectedPreset.label.pl}` })
  }

  const config: BattleConfig = {
      ruleset,
      language,
      simulations,
      seed,
      maxRounds: 100,
      startDistance,
      sideA: {
        creature: selectedCreatureA,
        count: normalizedSideA.count,
        heroId: normalizedSideA.heroId,
      },
      sideB: {
        creature: selectedCreatureB,
        count: normalizedSideB.count,
        heroId: normalizedSideB.heroId,
      },
  }
  const weeksError = numberError(weeks, 'weeks', language)
  const validationErrors = [...validateBattleConfig(config), ...(weeksError ? [weeksError] : [])]

  function runSimulation() {
    if (validationErrors.length) return
    setSummary(simulateMany(config))
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Heroes of Might and Magic III</p>
          <h1>{t(language, 'title')}</h1>
          <p>{t(language, 'subtitle')}</p>
        </div>

        <div className="toolbar" aria-label="Global controls">
          <label>
            <span>{t(language, 'language')}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </label>

          <label>
            <span>{t(language, 'ruleset')}</span>
            <select value={ruleset} onChange={(event) => { setRuleset(event.target.value as Ruleset); setSummary(null) }}>
              <option value="complete">Complete</option>
              <option value="hota">Horn of the Abyss</option>
            </select>
          </label>
        </div>
      </header>

      <section className="config-strip" aria-label="Simulation settings">
        <label>
          <span>{t(language, 'simulations')}</span>
          <NumberInput
            field="simulations"
            value={simulations}
            onChange={value => { setSimulations(value); setSummary(null) }}
          />
        </label>
        <label>
          <span>{t(language, 'seed')}</span>
          <NumberInput
            field="seed"
            value={seed}
            onChange={value => { setSeed(value); setSummary(null) }}
          />
        </label>
        <label>
          <span>{t(language, 'weeks')}</span>
          <NumberInput
            field="weeks"
            value={weeks}
            onChange={value => { setWeeks(value); setSummary(null) }}
          />
        </label>
        <label>
          <span>{t(language, 'startDistance')}</span>
          <NumberInput
            field="startDistance"
            value={startDistance}
            onChange={value => { setStartDistance(value); setSummary(null) }}
          />
        </label>
        <label className="preset-field">
          <span>{t(language, 'publicPreset')}</span>
          <select
            value={selectedPresetId}
            onChange={(event) => setSelectedPresetId(event.target.value)}
          >
            {(presetPayload?.presets ?? []).map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label[language]}
              </option>
            ))}
          </select>
        </label>
        <button className="apply-preset" type="button" onClick={applyPublicPreset} disabled={!selectedPreset}>
          {t(language, 'applyPreset')}
        </button>
        <button type="button" onClick={applyWeeklyGrowthPreset} disabled={!!weeksError}>
          {t(language, 'setWeeklyGrowth')}
        </button>
        <button type="button" onClick={applyEqualGoldPreset} disabled={!equalGoldPreview.ok || !!weeksError}>
          {t(language, 'setEqualGold')}
        </button>
        {selectedPreset?.description && <p className="preset-description muted">{selectedPreset.description[language]}</p>}
      </section>

      {validationErrors.length > 0 && <div role="alert" className="validation-errors">
        <ul>{validationErrors.map(error => <li key={error}>{error}</li>)}</ul>
      </div>}

      {(presetMessage || !equalGoldPreview.ok) && (
        <p className="preset-message">
          {presetMessage?.[language] ?? t(language, 'equalGoldUnavailable')}
        </p>
      )}

      <div className="duel-grid">
        <SidePanel
          title={t(language, 'attacker')}
          language={language}
          side={normalizedSideA}
          creatures={creatures}
          heroes={heroes}
          onChange={updateSideA}
        />
        <SidePanel
          title={t(language, 'defender')}
          language={language}
          side={normalizedSideB}
          creatures={creatures}
          heroes={heroes}
          onChange={updateSideB}
        />
      </div>

      <div className="simulation-action">
        <button type="button" onClick={runSimulation} disabled={validationErrors.length > 0}>
          {t(language, 'run')}
        </button>
        <p className="muted">{t(language, 'modelLimits')}</p>
      </div>
      <Results language={language} summary={summary} />

      <footer>
        <strong>{t(language, 'sources')}:</strong>{' '}
        <a href="https://heroes.thelazy.net/index.php/List_of_creatures">creatures</a>,{' '}
        <a href="https://heroes.thelazy.net/index.php/Heroes">heroes</a>,{' '}
        <a href="https://heroes.thelazy.net/index.php/Damage">damage</a>. {t(language, 'hosting')}
      </footer>
    </main>
  )
}
