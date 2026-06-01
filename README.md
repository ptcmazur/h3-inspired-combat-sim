# HoMM3 Monster Duel Simulator

Static React/Vite MVP for simulating Heroes of Might and Magic III creature stack duels in the browser.

This is a fan-made, educational battle simulator inspired by classic turn-based fantasy strategy games.

This project is not affiliated with, endorsed by, or sponsored by Ubisoft.
It does not include original Heroes of Might and Magic III assets, graphics, music, sounds, or proprietary game files.

## Local Development

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
```

## Public Hosting

Recommended public path: Firebase Hosting.

1. Create or select an existing Firebase project in your GCP account.
2. Run `npx firebase-tools login`.
3. Run `npx firebase-tools init hosting`, choose the existing project, set the public directory to `dist`, and enable SPA rewrites.
4. Set GitHub Actions variable `FIREBASE_PROJECT_ID` to the selected project ID.
5. Set GitHub Actions secret `FIREBASE_SERVICE_ACCOUNT` to the Firebase Hosting deploy service account JSON.
6. Merge to `main`; `.github/workflows/deploy-firebase.yml` runs tests, lint, build, and deploys the live Firebase Hosting channel.

Local deploy is available with:

```powershell
npm run deploy:firebase
```

The first public URL can use the default Firebase `web.app` / `firebaseapp.com` subdomains. A custom domain can be connected later from the Firebase Hosting console.

Cloudflare Pages, Netlify, Vercel, and GitHub Pages also work because the app is a static frontend-only build, but Firebase Hosting is the primary release target for this project.

## Public Presets

Read-only public presets are served as static JSON from Firebase Hosting:

- Versioned data: `/data/presets.v1.json`
- Pointer metadata: `/data/presets.latest.json`

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
