# Catalog generation and manual corrections

Use Node 24 or newer (also used in CI). The generator has no additional dependencies beyond the existing Cheerio package.

## Commands

- `npm run data:preview` fetches sources, validates the complete result, applies corrections and prints a report. It does not write catalog files.
- `npm run data:generate` performs the same checks, creates local backups, then replaces both catalogs and writes `src/data/generation-report.json`.
- `npm test -- scripts/wiki-parser.test.ts scripts/wiki-generator.test.ts` runs entirely offline with synthetic HTML and temporary directories. `node scripts/generate-wiki-data.mjs --help` does not access the network.

## Where to edit

Put permanent corrections in `src/data/overrides.ts`, keyed by the existing creature or hero ID. Generated `creatures.ts` and `heroes.ts` are output files. Example:

```ts
export const creatureOverrides: Record<string, CreatureOverride> = {
  'castle-pikeman': { name: { pl: 'Pikinier' }, stats: { health: 10 } },
}
```

`name`, `stats` and `primary` are merged by field. Arrays such as `abilities` replace the complete field. IDs cannot be changed through overrides. Unknown IDs, fields and invalid corrected stats stop generation. Overrides are never rewritten by the generator. Output is ordered by ID for reproducible diffs.

Before this change the only distinct Polish name in the existing catalog was the `none` hero; its `Bez bohatera` name is explicitly retained. No speculative translations or new game statistics have been applied. Before the first write, transfer any other direct catalog edits you want to preserve to overrides. After the first recorded generation, checksum differences in generated files stop subsequent runs and request migration of those manual edits.

## Safety and recovery

All pages, primary hero stats and corrected records must validate before writing. Empty or truncated tables, missing numeric fields, missing hero classes, duplicate IDs, removed IDs and undersized catalogs are rejected. Production minimums are 140 creatures and 150 heroes. Changes to existing IDs appear in the report for review.

A lock prevents concurrent publication; existing file contents are checked again under the lock. Each write retains originals and staged content under the ignored `src/data/.wiki-backups/generation-*` directory. If a replacement fails, the files already replaced are restored. These are recoverable multi-file writes, not a filesystem transaction: a power loss or failed rollback can require manual recovery from the backup. Do not delete backups until you have reviewed and tested the generated files. After a crashed process, check that no generator is running before removing its lock and restoring originals.

## Provenance and rules

Sources are the wiki's List_of_creatures, Heroes and hero-class pages, as used by the previous generator. Every successful report includes their URL, retrieval time, SHA-256 of the received HTML, and MediaWiki revision ID when present. Missing revision metadata is recorded as null, never guessed. The report also lists added, removed and changed record IDs and output checksums. A preview prints this information; a write commits it to the local report file for review alongside catalog changes.

Output checksums normalize CRLF to LF so a Git checkout on Windows is not mistaken for a manual data edit. Source HTML checksums retain the received line endings.

`h3-sim-catalog-v1` is the pinned simulator data interpretation profile: Complete excludes the configured HotA-only factions/neutral units; HotA includes them. It is not an official game release identifier. Exact Complete/HotA source release versions remain `unverified`: one shared wiki stat table cannot establish separate historical versions. Review changes before writing; do not treat the selector names as proof of full game-version accuracy. Range and melee exemptions are kept distinct; the simulator still does not implement range penalties.

For shared creature rows and hero primary stats, alternate HTML values use the HotA view. Creature rows explicitly marked SoD-only remain available to Complete with their SoD values; HotA-only rows are restricted to HotA. This does not provide separate Complete statistics for shared units. Explicit aliases preserve the existing Snow Elf and Mammoth IDs after the wiki added `(HotA)` to their page titles. Unknown future renames still stop generation when they would remove an existing ID.

Both SoD-only and HotA-only hero rows are retained with their corresponding ruleset. Hero IDs retain the previous combined-name and duplicate-suffix convention to preserve saved references, while displayed names use the selected view. Duplicate hero IDs still depend on source row order: review any changed record before publishing a refreshed catalog.

The CLI spaces requests two seconds apart and uses a 20-second timeout. HTTP failures, including rate limits (429), stop the run without changing catalogs; retry later rather than bypassing the source limit.

The HTML parser deliberately fails closed on an unsupported table layout. Offline tests verify its contract, not that the live wiki will retain the same layout. A live preview must succeed before a live regeneration is accepted.
