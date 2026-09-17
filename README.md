# Spank Betting

A single-file social sports prediction app played entirely with **Spank Coins** — virtual currency
with no cash value. Nothing can be purchased, deposited, cashed out for real money, or traded. Every
game, opponent, price and rival user is simulated.

Open `index.html` in any browser. No build step, no server, no network — the stylesheet is compiled
into the file, so it works offline.

## What's in it

**Dashboard** — balance, lifetime profit and ROI, win/loss record and streak, live tickets with
running scores, recent results. A daily bonus (+750) unlocks every 8 hours, and going broke turns it
into a larger instant bailout (+1,000) so you're never stuck at zero.

**Scoreboard** — NFL, NBA, MLB, NHL, EPL and UFC, filterable by league. Games move through pre-game →
live → final on their own; a full game runs in about 90 seconds, so you see tickets settle in one
sitting. Cards tick scores and a real sport-specific game clock.

**Markets** — moneyline, spread and total on every card, and a full market sheet behind each matchup
with first team to score, first-half / F5 / first-period spreads and totals, player props, and method
of victory for UFC. Prices are American odds.

**Live odds** — once a game tips off, every market is re-priced from the current score and time
remaining, and markets that are already decided come off the board. A team down 30 in the fourth is
priced like a team down 30, not at its opening number.

**Parlays** — stack up to 8 legs from different games; the odds multiply and every leg has to land.
One leg per game, so picking a second market from the same matchup swaps your pick. A pushed leg
drops out and the parlay pays on the rest.

**Cash out** — bail on a live ticket for a price that tracks the win probability of every remaining
leg. The quote moves with the game right up until you confirm.

**Feed & leaderboard** — a running social feed of wins, bad beats and takes, with likes, filters and
your own posts (big wagers and big cashes post themselves). A podium leaderboard ranks everyone by
total coins, you included.

**Profile** — editable display name and avatar, bankroll history graph, 12 unlockable badges, full
settled-bet history, and account controls to claim coins or reset.

## Technical notes

- One file: `index.html`. Vanilla JS, no framework, no runtime dependencies.
- Dark, mobile-first UI built to feel native — bottom tab bar, floating bet slip, bottom sheets,
  safe-area insets, spring transitions, toasts and confetti.
- State (balance, bets, slip, games, feed, stats, profile) persists in `localStorage` under
  `spankbet.state.v2` and survives refreshes. Saves from the earlier single-bet version migrate
  automatically; corrupt or missing state falls back to a fresh account.
- Each game's scoring timeline — including per-player prop contributions — is generated up front, so
  scores and results stay consistent across reloads and grade correctly even if the tab was closed
  while a game finished.
- Tickets are never stranded: if a game leaves the board, its leg is voided and the stake refunded.

### Rebuilding the stylesheet

`index.html` carries a Tailwind build trimmed to only the classes the app uses, between the
`<style id="tw">` markers. After adding new utility classes, regenerate it:

```bash
tools/build-css.sh
```

That compiles `tools/input.css` with `tools/tailwind.config.js` (which holds the custom `ink` /
`neon` / `flame` / `gold` palette) and splices the result back into `index.html`.
