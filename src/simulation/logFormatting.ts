import type { BattleLogEntry, BattleLogPhase, DamageBreakdown, Language } from '../types'

const phases: Record<Language, Record<BattleLogPhase, string>> = {
  en: { roundStart: 'Round start', turnOrder: 'Turn order', move: 'Movement', firstAttack: 'First attack', attack: 'Attack', luck: 'Luck', retaliation: 'Retaliation', noRetaliation: 'No retaliation', doubleAttack: 'Double attack', morale: 'Morale', roundEnd: 'Round end' },
  pl: { roundStart: 'Początek rundy', turnOrder: 'Kolejność ruchów', move: 'Ruch', firstAttack: 'Pierwszy atak', attack: 'Atak', luck: 'Szczęście', retaliation: 'Kontratak', noRetaliation: 'Bez kontrataku', doubleAttack: 'Podwójny atak', morale: 'Morale', roundEnd: 'Koniec rundy' },
}

export function phaseLabel(phase: BattleLogPhase, language: Language): string {
  return phases[language][phase]
}

export function formatBattleEvent(entry: BattleLogEntry, language: Language): string {
  const data = entry.data
  if (!data) return entry.message
  const pl = language === 'pl'
  const actor = `${entry.side ?? ''}: ${data.actor?.[language] ?? ''}`
  const target = `${data.targetSide ?? ''}: ${data.target?.[language] ?? ''}`
  switch (entry.phase) {
    case 'roundStart':
    case 'turnOrder':
      return `${pl ? 'Kolejność ruchów' : 'Turn order'}: ${data.order?.map(side => `${side.side}: ${side.name[language]}`).join(' → ')}.`
    case 'move': return pl ? `${actor} przesuwa się o ${data.steps}. Pozostały dystans: ${data.distance}.` : `${actor} moves ${data.steps} steps. Remaining distance: ${data.distance}.`
    case 'firstAttack': return pl ? `${actor} wykonuje pierwszy atak w walce.` : `${actor} makes the first attack of the battle.`
    case 'attack':
    case 'retaliation': {
      if (data.shotsLeft !== undefined) return pl ? `${actor} strzela z dystansu ${data.distance}. Amunicja: ${data.shotsLeft}.` : `${actor} shoots from ${data.distance} steps. Ammunition: ${data.shotsLeft}.`
      const damage = data.damage
      if (!damage) return entry.message
      const action = entry.phase === 'retaliation' ? (pl ? 'kontratakuje' : 'retaliates against') : (pl ? 'atakuje' : 'attacks')
      return pl
        ? `${actor} ${action} ${target}: ${damage.amount} obrażeń. Straty: ${damage.killed}, pozostało: ${damage.remaining}.`
        : `${actor} ${action} ${target}: ${damage.amount} damage. Lost: ${damage.killed}, remaining: ${damage.remaining}.`
    }
    case 'luck': return pl ? `${actor}: szczęście podwaja obrażenia.` : `${actor}: luck doubles the damage.`
    case 'noRetaliation': return pl ? `${actor} blokuje kontratak.` : `${actor} prevents retaliation.`
    case 'doubleAttack': return pl ? `${actor} może wykonać drugi atak, jeśli przeżyje i ma amunicję do strzału.` : `${actor} can attack twice if it survives and has ammunition when shooting.`
    case 'morale': return pl ? `${actor}: dodatnie morale daje dodatkowy ruch.` : `${actor}: good morale grants an extra turn.`
    case 'roundEnd': return pl ? `Koniec rundy ${entry.round}. Dystans: ${data.distance}.` : `Round ${entry.round} ends. Distance: ${data.distance}.`
  }
}

export function formatDamageBreakdown(damage: DamageBreakdown, language: Language): string {
  const { base, attack, defense, attackMultiplier, meleeMultiplier, luckMultiplier, amount } = damage
  const expression = `${base} × ${attackMultiplier} × ${meleeMultiplier}`
  return language === 'pl'
    ? `Podstawa: ${base}; atak ${attack}, obrona ${defense}. ${expression} → zaokrąglenie w dół (minimum 1) → szczęście × ${luckMultiplier} = ${amount}.`
    : `Base: ${base}; attack ${attack}, defense ${defense}. ${expression} → round down (minimum 1) → luck × ${luckMultiplier} = ${amount}.`
}
