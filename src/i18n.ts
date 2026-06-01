import type { Language } from './types'

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
    unsupported: 'Other specials',
    sources: 'Data references',
    hosting: 'Free hosting path: build the static app and publish dist/ with GitHub Pages.',
  },
  pl: {
    title: 'Symulator pojedynkow HoMM3',
    subtitle: 'Wybierz dwa stosy, dodaj bohaterow i uruchom pelne walki w przegladarce.',
    language: 'Jezyk',
    ruleset: 'Zestaw zasad',
    attacker: 'Atakujacy',
    defender: 'Obronca',
    creature: 'Potwor',
    quantity: 'Liczebnosc',
    hero: 'Bohater',
    simulations: 'Symulacje',
    seed: 'Seed',
    weeks: 'Tygodnie',
    startDistance: 'Dystans startowy',
    run: 'Uruchom symulacje',
    setWeeklyGrowth: 'Ustaw wg tygodniowego przyrostu',
    setEqualGold: 'Ustaw wg rownego zlota',
    publicPreset: 'Publiczny preset',
    applyPreset: 'Zastosuj preset',
    presetApplied: 'Zastosowano preset',
    equalGoldUnavailable: 'Rowne zloto wymaga poprawnego kosztu zlota dla obu potworow.',
    equalGoldBudget: 'Rowny budzet',
    results: 'Wyniki',
    winRate: 'Szansa wygranej',
    wins: 'Wygrane',
    averageSurvivors: 'Srednio ocalalych',
    draws: 'Remisy',
    sampleLog: 'Przykladowy log walki',
    round: 'Runda',
    stats: 'Statystyki',
    abilities: 'Obslugiwane zdolnosci',
    unsupported: 'Pozostale speciale',
    sources: 'Zrodla danych',
    hosting: 'Darmowy hosting: zbuduj statyczna aplikacje i opublikuj dist/ przez GitHub Pages.',
  },
}

export function t(language: Language, key: MessageKey): string {
  return messages[language][key]
}
