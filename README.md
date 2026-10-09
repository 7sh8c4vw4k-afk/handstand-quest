# Handstand Quest (PWA)

A self-contained beginner handstand + yoga/mobility trainer for **Long** — dark athletic UI, shared XP/levels, separate streaks, a 6-stage handstand map, a peer **Yoga / Mobility** track, and desk-friendly **Office Snacks**. Works as an installable Progressive Web App on iPhone (Safari → Add to Home Screen).

## How to open

No build step, no bundler.

1. Serve the folder over **HTTP(S)** (required for the service worker). Opening `file://` works for UI but will not register the SW.
2. On a phone: open the HTTPS URL in Safari, then install (see below).

### Local server

```bash
cd /workspace/handstand-app
python3 -m http.server 8765
```

Then open `http://localhost:8765` in a browser.

### Direct file path

```
/workspace/handstand-app/index.html
```

## Install on iPhone (Add to Home Screen)

1. Deploy or tunnel so you have an **HTTPS** URL (or use localhost for local testing on a Mac).
2. Open the URL in **Safari** (Chrome on iOS does not offer the same Add to Home Screen flow for PWAs).
3. Tap the **Share** button (square with arrow).
4. Scroll and tap **Add to Home Screen**.
5. Confirm the name (**Handstand**) and tap **Add**.

The app opens fullscreen (standalone), uses the mint/charcoal icon, and caches the app shell for offline use after the first visit.

### Install tip in-app

Home shows a dismissible “Install on iPhone” card. Dismissing it stores a flag in `localStorage` under `handstand-pwa-install-tip-dismissed` (separate from game data). The tip is hidden automatically when already running as a home-screen app.

## Features

- **Home** — level, XP bar, main streak, Daily Mini + Yoga + Office Snacks status/streaks, current handstand stage, last session, install tip
- **Snacks** — 2–4 min office desk-stretch packs (neck, chest, hips, wrists, thoracic, full reset); up to 3/day
- **Mini** — ~5–8 min Daily Mini stretch/mobility circuit (separate from quest days)
- **Quest** — ~12–15 min drill list for your current handstand stage, mobility rest day, unlock attempt, weekly boss fight
- **Yoga** — peer mobility track (6 stages): soft start → hips → hamstrings → shoulders → flow A → flow B; own streak; shared XP
- **Log** — mark handstand drills done, wrist feel 1–5, optional hold/kicks, notes → +10 XP
- **Map** — 6 handstand stages with locked / current / done states
- **History** — past sessions (including `mini`, `yoga`, and `office-snack` entries) with XP earned
- **Settings** — display name (default Long), double-confirm progress reset

## Gamification

| Action | XP |
|--------|-----|
| Session complete | +10 |
| Unlock attempt (self-report) | +5 |
| Stage unlock (handstand) | +20 |
| Streak hits multiple of 3 (handstand or yoga) | +15 |
| Mobility rest day | +5 |
| Daily Mini (once per calendar day) | +5 |
| Office snack (up to 3 per calendar day) | +3 each (+9 max) |
| Yoga flow (once per calendar day) | +12 |
| Yoga stage unlock (self-report) | +20 |
| Boss fight log | +10 |

- **Level** = floor(total XP / 50) + 1 (Level 1 at 0–49 XP) — **shared** across handstand, mini, yoga, and office snacks
- **Main streak** increments when you log a full session (or rest day) within 5 calendar days of the previous session; resets if gap &gt; 5 days. Daily Mini, Yoga, and Office Snacks do **not** change main streak.
- **Mini streak** (`miniStreak`) increments on consecutive calendar days with a Daily Mini logged; stored with `lastMiniDate`.
- **Yoga streak** (`yogaStreak`) increments on consecutive calendar days with a yoga flow; gap &gt; 1 day resets. Bonus +15 XP every 3 yoga streak days. Tracked with `lastYogaDate`, `yogaUnlockedStage`, `yogaCompletedStages`.
- **Office snack streak** (`officeSnackStreak`) increments on consecutive calendar days with ≥1 snack logged; tracked with `lastOfficeSnackDate` and `officeSnackCountToday` (resets count each new day; max 3 snacks/day). Does **not** change handstand, mini, or yoga streaks.

## Data

Game progress is persisted in `localStorage` under key **`handstand-rpg-v1`**. New fields (`miniStreak`, `lastMiniDate`, `yogaStreak`, `lastYogaDate`, `yogaUnlockedStage`, `yogaCompletedStages`, `officeSnackCountToday`, `lastOfficeSnackDate`, `officeSnackStreak`) load with defaults for older saves. Stays on the device/browser that runs the app. Install-tip dismissal uses a separate key and does not alter game state.

## PWA files

| File | Role |
|------|------|
| `manifest.webmanifest` | Name, theme, icons, `display: standalone` |
| `sw.js` | Caches app shell (`handstand-quest-v5`); bump `CACHE_NAME` when assets change |
| `icons/icon-180.png` | Apple touch / general |
| `icons/icon-192.png` | Manifest / favicon |
| `icons/icon-512.png` | Manifest (any + maskable) |
| `icons/apple-touch-icon.png` | Safari home screen (180×180) |
| `index.html` | Manifest + Apple meta tags + SW registration |
| `styles.css` | Dark charcoal + electric mint; safe-area insets |
| `app.js` | Game logic (vanilla JS) |

## Verify locally

```bash
cd /workspace/handstand-app
python3 -m http.server 8765
```

1. Open `http://localhost:8765` — UI and game logic work.
2. DevTools → Application → Manifest — should show Handstand Quest, theme `#0f1115`, icons.
3. DevTools → Application → Service Workers — `sw.js` registered; Cache Storage has `handstand-quest-v4`.
4. Offline: DevTools Network → Offline, reload — shell still loads.
5. On iPhone over HTTPS: Safari → Share → Add to Home Screen; open from home screen (no Safari chrome).

## iOS PWA limitations

- **HTTPS required** for service workers (except `localhost`). `file://` will not install a working SW.
- Install via **Safari** Share → Add to Home Screen (not a Chrome-style install prompt).
- No push notifications / background sync on iOS the way Android Chrome offers them.
- Storage can be cleared if the home-screen app is unused for a long time (iOS may evict website data); keep backups of important progress if needed.
- `apple-mobile-web-app-status-bar-style: black-translucent` draws under the status bar; the layout uses `env(safe-area-inset-*)` for notched phones.
