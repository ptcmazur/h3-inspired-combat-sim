# HoMM3 Monster Duel Simulator

Static React/Vite MVP for simulating Heroes of Might and Magic III creature stack duels in the browser.

This is a fan-made, educational battle simulator inspired by classic turn-based fantasy strategy games.

This project is not affiliated with, endorsed by, or sponsored by Ubisoft.
It does not include original Heroes of Might and Magic III assets, graphics, music, sounds, or proprietary game files.

## Local Development

Project notes: [structure and findings](docs/PROJECT_ANALYSIS.md), [roadmap and task status](docs/superpowers/plans/2026-09-05-project-roadmap.md).

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Verification

```powershell
npm test
npm run lint
npm run build
npm run build:pages
```

## Public Hosting

Primary hosting: [GitHub Pages](https://ptcmazur.github.io/h3-inspired-combat-sim/).

In repository Settings -> Pages, select GitHub Actions as the source.
`.github/workflows/deploy-pages.yml` tests, lints and builds the app, then publishes it on each push to `main` or manual run. It uses the repository token and does not require hosting credentials.

The Pages build sets Vite's base to `/h3-inspired-combat-sim/`. Asset and preset URLs use that base. To preview the same build locally:

```powershell
npm run build:pages
npm run preview -- --base=/h3-inspired-combat-sim/
```

Open `http://localhost:4173/h3-inspired-combat-sim/`.

For browser verification, start the preview with `npm run preview -- --host 127.0.0.1 --port 4176 --base=/h3-inspired-combat-sim/`, then run `npm run test:smoke` in another terminal. The check covers 360/768/1280 px layouts, presets, simulation, Polish logs, damage explanations, validation and keyboard activation. It uses installed Microsoft Edge on Windows; elsewhere install Playwright Chromium with `npx playwright install chromium` first. Pass a different URL with `npm run test:smoke -- https://ptcmazur.github.io/h3-inspired-combat-sim/`.

Implemented rules and current limitations: [combat rules](docs/COMBAT_RULES.md).

Firebase remains an optional manual target. Its workflow requires `FIREBASE_PROJECT_ID` and `FIREBASE_SERVICE_ACCOUNT`; local deployment is available through `npm run deploy:firebase` after selecting and authenticating a Firebase project.

The simulator is an early MVP with simplified combat rules; see the in-app notes on unsupported creature abilities.

## Public Presets

Read-only public presets are served as static JSON relative to the deployment base:

- Versioned data: `data/presets.v1.json`
- Pointer metadata: `data/presets.latest.json`

The frontend fetches the versioned JSON file and falls back to bundled presets if the request fails. This keeps public preset/catalog reads out of Firestore and avoids document-read billing for the current MVP.

## Data

Generated data comes from Heroes 3 wiki pages:

- `https://heroes.thelazy.net/index.php/List_of_creatures`
- `https://heroes.thelazy.net/index.php/Heroes`
- `https://heroes.thelazy.net/index.php/Damage`

Regenerate local TypeScript data with:

```powershell
node scripts/generate-wiki-data.mjs
```
