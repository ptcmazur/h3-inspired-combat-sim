import type { CreatureAbility, Language } from './types'

type MessageKey =
  | 'title'
  | 'subtitle'
  | 'language'
  | 'ruleset'
  | 'attacker'
  | 'defender'
  | 'creature'
  | 'quantity'
  | 'hero'
  | 'simulations'
  | 'seed'
  | 'weeks'
  | 'startDistance'
  | 'run'
  | 'setWeeklyGrowth'
  | 'setEqualGold'
  | 'publicPreset'
  | 'applyPreset'
  | 'presetApplied'
  | 'equalGoldUnavailable'
  | 'equalGoldBudget'
  | 'results'
  | 'winRate'
  | 'wins'
  | 'averageSurvivors'
  | 'draws'
  | 'sampleLog'
  | 'round'
  | 'stats'
  | 'abilities'
  | 'unsupported'
  | 'sources'
  | 'hosting'
  | 'damageExplanation'
  | 'sampleOutcome'
  | 'rounds'
  | 'events'
  | 'luckRoll'
  | 'luckChance'
  | 'totalFights'
  | 'search'
  | 'growth'
  | 'cost'
  | 'shots'
  | 'none'
  | 'modelLimits'

const messages: Record<Language, Record<MessageKey, string>> = {
  en: {
    title: 'HoMM3 Monster Duel Simulator',
    subtitle: 'Pick two stacks, add heroes, and run complete browser-side battles.',
    language: 'Language',
    ruleset: 'Ruleset',
    attacker: 'Attacker',
    defender: 'Defender',
    creature: 'Creature',
    quantity: 'Quantity',
    hero: 'Hero',
    simulations: 'Simulations',
    seed: 'Seed',
    weeks: 'Weeks',
    startDistance: 'Start distance',
    run: 'Run simulation',
    setWeeklyGrowth: 'Set by weekly growth',
    setEqualGold: 'Set by equal gold',
    publicPreset: 'Public preset',
    applyPreset: 'Apply preset',
    presetApplied: 'Preset applied',
    equalGoldUnavailable: 'Equal gold needs valid gold costs for both creatures.',
    equalGoldBudget: 'Equal budget',
    results: 'Results',
    winRate: 'Win rate',
    wins: 'Wins',
    averageSurvivors: 'Average survivors',
    draws: 'Draws',
    sampleLog: 'Sample fight log',
    round: 'Round',
    stats: 'Stats',
    abilities: 'Core abilities',
    unsupported: 'Creature reference (not all effects are simulated)',
    sources: 'Data references',
    hosting: 'Fan-made educational simulator.',
    damageExplanation: 'How was the damage calculated?',
    sampleOutcome: 'Sample outcome', rounds: 'rounds', events: 'events',
    luckRoll: 'Luck roll (0–1)', luckChance: 'Luck chance', totalFights: 'total fights',
    search: 'Search by name or faction', growth: 'Growth', cost: 'Gold cost', shots: 'Shots', none: 'None',
    modelLimits: 'Simplified 1D duel: no spells, terrain, range penalties or special ranged retaliation. Hero specialties and other skills are not simulated. Flying has no effect on this battlefield.',
  },
  pl: {
    title: 'Symulator pojedynków HoMM3',
    subtitle: 'Wybierz dwa stosy, dodaj bohaterów i porównaj wyniki serii walk.',
    language: 'Język',
    ruleset: 'Zestaw zasad',
    attacker: 'Atakujący',
    defender: 'Obrońca',
    creature: 'Potwor',
    quantity: 'Liczebność',
    hero: 'Bohater',
    simulations: 'Symulacje',
    seed: 'Seed',
    weeks: 'Tygodnie',
    startDistance: 'Dystans startowy',
    run: 'Uruchom symulację',
    setWeeklyGrowth: 'Ustaw wg tygodniowego przyrostu',
    setEqualGold: 'Ustaw wg równego złota',
    publicPreset: 'Publiczny preset',
    applyPreset: 'Zastosuj preset',
    presetApplied: 'Zastosowano preset',
    equalGoldUnavailable: 'Równe złoto wymaga poprawnego kosztu obu jednostek.',
    equalGoldBudget: 'Równy budżet',
    results: 'Wyniki',
    winRate: 'Szansa wygranej',
    wins: 'Wygrane',
    averageSurvivors: 'Średnio ocalałych',
    draws: 'Remisy',
    sampleLog: 'Przykładowy log walki',
    round: 'Runda',
    stats: 'Statystyki',
    abilities: 'Obsługiwane zdolności',
    unsupported: 'Opis z katalogu (nie wszystkie efekty są symulowane)',
    sources: 'Źródła danych',
    hosting: 'Fanowski symulator edukacyjny.',
    damageExplanation: 'Jak policzono obrażenia?',
    sampleOutcome: 'Wynik przykładowej walki', rounds: 'rund', events: 'zdarzeń',
    luckRoll: 'Rzut szczęścia (0–1)', luckChance: 'Szansa szczęścia', totalFights: 'walk w serii',
    search: 'Szukaj po nazwie lub frakcji', growth: 'Przyrost', cost: 'Koszt złota', shots: 'Strzały', none: 'Brak',
    modelLimits: 'Uproszczony pojedynek 1D: bez czarów, terenu, kar za odległość i specjalnych kontrataków strzeleckich. Specjalności bohaterów i pozostałe umiejętności nie są symulowane. Latanie nie wpływa na tę planszę.',
  },
}

export function t(language: Language, key: MessageKey): string {
  return messages[language][key]
}

export function abilityLabel(ability: CreatureAbility, language: Language, ranged: boolean): string {
  const names = {
    en: { ranged: 'Ranged', noRetaliation: 'No retaliation', doubleAttack: ranged ? 'Double shot' : 'Double strike', noMeleePenalty: 'Full melee damage', flying: 'Flying (no effect in 1D)' },
    pl: { ranged: 'Strzelec', noRetaliation: 'Bez kontrataku', doubleAttack: ranged ? 'Podwójny strzał' : 'Podwójny cios', noMeleePenalty: 'Pełne obrażenia wręcz', flying: 'Latanie (bez wpływu w 1D)' },
  }
  return names[language][ability]
}
