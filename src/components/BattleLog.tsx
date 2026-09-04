import type { BattleResult, Language } from '../types'
import { t } from '../i18n'
import { formatBattleEvent, formatDamageBreakdown, phaseLabel } from '../simulation/logFormatting'

export function BattleLog({ sample, total, language }: { sample: BattleResult; total: number; language: Language }) {
  const rounds = new Map<number, typeof sample.log>()
  for (const entry of sample.log) {
    if (!rounds.has(entry.round)) rounds.set(entry.round, [])
    rounds.get(entry.round)!.push(entry)
  }
  return <details className="log-panel" open>
    <summary>{t(language, 'sampleLog')}</summary>
    <p className="muted">{language === 'pl'
      ? `Log przedstawia jedną walkę z serii ${total}. Procenty powyżej dotyczą całej serii.`
      : `This log shows one fight from a batch of ${total}. The percentages above describe the whole batch.`}</p>
    <p className="sample-outcome">{t(language, 'sampleOutcome')}: {sample.winner === 'draw' ? t(language, 'draws') : sample.winner} · {sample.rounds} {t(language, 'rounds')}</p>
    <div className="round-log">
      {[...rounds].map(([round, entries]) => <details className="round-log-section" key={round} open={round === 1}>
        <summary><h3>{t(language, 'round')} {round}</h3><span className="muted">{entries.length} {t(language, 'events')}</span></summary>
        <ol>{entries.map((entry, index) => <li key={index}>
          <span className={`log-phase phase-${entry.phase}`}>{phaseLabel(entry.phase, language)}</span>
          <span>{formatBattleEvent(entry, language)}</span>
          {entry.data?.damage && <details className="damage-details">
            <summary>{t(language, 'damageExplanation')}</summary>
            <p>{formatDamageBreakdown(entry.data.damage, language)}</p>
            <p>{t(language, 'luckRoll')}: {entry.data.damage.luckRoll.toFixed(4)} · {t(language, 'luckChance')}: {(entry.data.damage.luckChance * 100).toFixed(2)}%</p>
          </details>}
        </li>)}</ol>
      </details>)}
    </div>
  </details>
}
