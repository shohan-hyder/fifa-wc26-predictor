# ⚽ FIFA World Cup 2026 Predictor

A fully interactive World Cup 2026 tournament predictor — 48 teams, 12 groups, 100% correct FIFA rules.

## 🚀 Deploy to Netlify (1 click)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Select your repo — Netlify auto-detects the build command (`npm run build`) and publish dir (`dist`)
4. Click **Deploy** — done!

## 🏗️ Local Development

```bash
npm install
npm run dev
```

## ✅ What's Included

- All 48 confirmed teams with flags (official FIFA Dec 5 2025 draw)
- All 12 Groups (A–L) with correct seedings
- 72 group-stage fixtures with score input
- Live standings using **100% correct FIFA 2026 tiebreaker rules**:
  1. Points → 2. H2H points → 3. H2H GD → 4. H2H GF → 5. Overall GD → 6. Overall GF → 7. Fair play → 8. Lots
- Best 3rd-place team calculation (8 of 12 advance)
- Manual knockout bracket (Round of 32 → Final)
- Champion reveal with confetti 🎉
- Share your prediction
- Rules reference page
- History tab with all-time records
- Gen Z football design — dark, lime, gold palette
- Fully responsive (mobile-first)
- Lightweight: ~57KB gzipped

## 📋 Tech Stack

- React 18 (no class components)
- Vite 5 (lightning fast build)
- Zero external runtime dependencies
- Pure CSS (no frameworks)
- Netlify for hosting

## 🌍 Data Sources

- Official FIFA World Cup 2026 groups: Kennedy Center Draw, Dec 5 2025
- FIFA World Rankings: April 1 2026 official update
- Tournament format: FIFA official regulations
