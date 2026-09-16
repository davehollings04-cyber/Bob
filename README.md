# Spank Betting

A single-file social sports prediction app played entirely with **Spank Coins** — virtual currency
with no cash value. Nothing can be purchased, deposited, cashed out, or traded. Every game, opponent,
and rival user is simulated.

Open `index.html` in any browser. No build step, no server, no dependencies beyond the Tailwind CDN.

## What's in it

**Dashboard** — big balance readout, lifetime profit and ROI, win/loss record and streak, active
tickets with live scores, recent results. A daily bonus (+750) unlocks every 8 hours, and going broke
turns it into a larger instant bailout (+1,000) so you're never stuck at zero.

**Scoreboard & betting** — an ESPN-style board across NFL, NBA, MLB, NHL, EPL and UFC, filterable by
league. Games move through pre-game → live → final on their own; live cards tick scores and a real
game clock. Each matchup prices a moneyline, spread and total in American odds. Tapping any price
opens a bet slip drawer with quick-stake chips, a MAX button, and payout multiplier plus exact return
calculated as you type. Tickets grade automatically the moment their game ends — wins pay out, pushes
refund.

**Feed & leaderboard** — a running social feed of wins, bad beats and takes from other bettors, with
likes, filters, and your own posts (big wagers and big cashes auto-post). A leaderboard with a podium
ranks everyone by total coins, your entry included.

**Profile** — editable display name and avatar, a bankroll history graph, 10 unlockable badges, full
settled-bet history, and account controls for claiming coins or resetting to a fresh 2,500.

## Technical notes

- One file: `index.html`. Tailwind via CDN, vanilla JS, no framework.
- Dark, mobile-first UI built to feel native — bottom tab bar, bottom-sheet bet slip, safe-area
  insets, spring transitions, toasts and confetti.
- State (balance, bets, games, feed, stats, profile) persists in `localStorage` under
  `spankbet.state.v1` and survives refreshes. Corrupt or missing state falls back to a fresh account.
- Each game's scoring timeline is generated up front, so scores and results stay consistent across
  reloads and settle correctly even if the tab was closed while a game finished.
- Styling degrades rather than breaking if the CDN is unreachable.
