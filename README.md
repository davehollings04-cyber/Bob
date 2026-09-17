# Spank Betting

A single-file social sports prediction app played with **Spank Coins** — virtual currency with no
cash value. Nothing can be bought, deposited, cashed out for real money, or traded.

Open `index.html` in any browser. No build step, no server, no API key.

## Two boards

**Real games** — live matchups from ESPN's public feed: real teams, records, scores, game clocks and
real sportsbook spreads and totals, refreshed while you watch. Moneylines come from the feed where
published and are derived from the real spread otherwise. Covers NFL, NBA, MLB and NHL.

**Quick Play** — simulated games that run start to final in 90 seconds, so there's always something
to bet when nothing real is on. These carry the deeper markets: player props, first-half lines, first
team to score, method of victory. They work with no internet at all.

## First run

Opening it for the first time asks two things — pick an avatar, type a name — and then runs a
three-card tour. The first card is a real card you tap, so the odds explain themselves rather than
being described. It takes about thirty seconds, can be skipped at any point, and replays from
**You → Settings → How it works**. Existing saves never see it.

## What you can do

- **Bet** a moneyline, spread or total in two taps. Parlay up to 8 legs from different games; any
  losing leg kills the ticket, a pushed leg drops out and the rest still pay.
- **Cash out** a live ticket for a price built from each remaining leg's win probability. The quote
  moves with the game until you confirm.
- **Daily Pick** — one featured matchup a day, two buttons, no coins at risk. A single tap keeps your
  streak alive on days you don't feel like betting.
- **Streak, XP and a weekly league** — every action earns XP, a daily streak counts the days you show
  up, and each week 30 players race for promotion through six tiers. Top 5 move up, bottom 5 drop.
- **Feed, badges and bankroll history** on top of the usual profile.

Live odds move once a game starts: every market is re-priced from the current score and time
remaining, and markets that are already decided come off the board.

## Light and dark

Both themes ship, switchable in **You → Appearance**. *Auto* follows your phone's setting and
switches with it live. Every colour in the app resolves through one set of CSS custom properties, so
there is a single stylesheet rather than a dark-mode fork.

## Install it

Add it to your home screen — **Share → Add to Home Screen** on iPhone, **⋮ → Install app** on
Android — and it opens fullscreen with no browser bar. Turn on bet alerts in **You → Settings** to
get a notification when a ticket settles, which matters when a real game takes three hours.

## Technical notes

- One file: `index.html`. Vanilla JS, no framework, no runtime dependencies.
- Real and simulated games share one engine behind a small interface (`gProgress`, `gScore`,
  `gIsLive`…), so betting, grading, live pricing and cash-out never need to know which kind of game
  they're looking at.
- A ticket on a real game keeps a snapshot of that game. When the game drops off today's board, the
  app fetches that event by id to grade it — so a bet placed tonight settles correctly tomorrow.
- State persists in `localStorage` under `spankbet.state.v3`. Saves from both earlier versions
  migrate automatically; corrupt or missing state falls back to a fresh account.
- The live feed degrades quietly: failures back off exponentially, the board says so, and Quick Play
  carries on offline.
- Spank Coins are play money. Odds carry a house edge, checked against the simulation.

### Rebuilding the stylesheet

`index.html` carries a Tailwind build trimmed to only the classes the app uses, between the
`<style id="tw">` markers. After adding new utility classes, regenerate it:

```bash
tools/build-css.sh
```

That compiles `tools/input.css` with `tools/tailwind.config.js` — which maps Tailwind colours onto
the theme's CSS variables — and splices the result back into `index.html`.
