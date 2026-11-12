// @vitest-environment node
import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { parseCreatures, parseHeroRows, parsePrimaryStats } from './wiki-parser.mjs'

const html = await readFile(new URL('./fixtures/wiki-minimal.html', import.meta.url), 'utf8')
describe('offline wiki parsing', () => {
  it('reads the first data row and keeps range and melee exemptions distinct', () => {
    const [creature] = parseCreatures(html)
    expect(creature.id).toBe('castle-test-archer')
    expect(creature.stats.health).toBe(10)
    expect(creature.shots).toBe(12)
    expect(creature.abilities).not.toContain('noMeleePenalty')
    expect(parseCreatures(html.replace('No range', 'No melee'))[0].abilities).toContain('noMeleePenalty')
  })
  it('rejects missing or nonnumeric required cells instead of supplying zeroes', () => {
    expect(() => parseCreatures(html.replace('<td>10</td>', '<td>unknown</td>'))).toThrow()
    expect(() => parseCreatures(html.replace('<td>10</td>', ''))).toThrow()
    expect(() => parseCreatures('<html>Service unavailable</html>')).toThrow()
  })
  it('recognizes abbreviated wiki headers through their title attributes', () => {
    expect(parseCreatures(html.replace('<th>Attack</th>', '<th><span title="Attack">Att</span></th>').replace('<th>Defense</th>', '<th><span title="Defense">Def</span></th>'))).toHaveLength(1)
  })
  it('selects the HotA view instead of combining alternate stat values', () => {
    const dual = html.replace('<td>100</td>', '<td><span class="onlyhota">100</span><span class="onlysod">80</span></td>')
    expect(parseCreatures(dual)[0].stats.aiValue).toBe(100)
  })
  it('retains SoD-only rows and their matching stats for Complete', () => {
    const sod = html.replace('<tr><td>', '<tr class="onlysod"><td>').replace('<td>100</td>', '<td><span class="onlyhota">100</span><span class="onlysod">80</span></td>')
    const [creature] = parseCreatures(sod)
    expect(creature.rulesets).toEqual(['complete'])
    expect(creature.stats.aiValue).toBe(80)
  })
  it('preserves established IDs when wiki pages add HotA disambiguation', () => {
    const renamed = html.replaceAll('Test Archer', 'Snow Elf (HotA)').replaceAll('Castle', 'Bulwark')
    expect(parseCreatures(renamed)[0].id).toBe('bulwark-snow-elf')
    expect(parseCreatures(renamed)[0].spriteKey).toBe('bulwark-snow-elf')
    expect(parseCreatures(html.replace('2+', '3++'))[0].tier).toBe(3)
  })
  it('requires all four primary statistics, while accepting a genuine zero', () => {
    expect(parsePrimaryStats('<body>Attack 0 30% Defense 2 30% Spell Power 1 20% Knowledge 1 20%</body>')).toEqual({attack: 0, defense: 2, spellPower: 1, knowledge: 1})
    expect(() => parsePrimaryStats('<body>Attack 2 30%</body>')).toThrow()
  })
  it('rejects hero rows with missing columns or unrecognized classes', () => {
    expect(() => parseHeroRows('<table><tr><td>Test</td><td>Knight</td></tr></table>')).toThrow()
  })
  it('keeps both hero variants and legacy IDs while separating their visible names', () => {
    const row = '<tr><td>Ufretin</td><td>Ranger</td><td></td><td></td><td>None</td><td></td><td>Skill</td><td></td><td></td></tr>'
    const heroes = parseHeroRows('<table>' + row.replace('<tr>', '<tr class="onlysod">') + row.replace('<tr>', '<tr class="onlyhota">') + '</table>')
    expect(heroes.map(h => [h.id, h.rulesets])).toEqual([['ranger-ufretin', ['complete']], ['ranger-ufretin-2', ['hota']]])
    const renamed = row.replace('Ufretin', '<span class="onlyhota">Haart Lich</span><span class="onlysod">Lord Haart</span>').replace('Ranger', 'Death Knight')
    const [hero] = parseHeroRows('<table>' + renamed + '</table>')
    expect(hero.id).toBe('death-knight-haart-lichlord-haart')
    expect(hero.name.en).toBe('Haart Lich')
  })
})
