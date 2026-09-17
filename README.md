# Spank Betting

A single-file social sports prediction app played with **Spank Coins** — virtual currency with no
cash value. Nothing can be bought, deposited, cashed out for real money, or traded.

Open `index.html` in any browser. No build step, no server, no API key.

## Real games only

Live matchups from ESPN's public feed across **NFL, NBA, MLB and NHL**, covering a full calendar week
— yesterday's finals through five days ahead — with real teams, records, scores, game clocks and real
sportsbook spreads and totals. Moneylines come from the feed where published and are derived from the
real spread otherwise. Once a game starts, every market is re-priced from the score and time
remaining, and decided markets come off the board. A price already in your slip is locked and never
moves.

Games are grouped by day. The Daily Pick is always a game happening today.

## A small bankroll, and a real lockout

You start with **500 coins**. Lose them all and that is your day — betting is closed until midnight,
when a fresh 500 lands. There is no bailout button, so the coins have to mean something.

Coins that survive can be spent in the **prize shop** on permanent badges.

## Play with friends

Everyone who enters the same **room code** shares one chat, one live bet ticker and one leaderboard.
Messages and tickets land on everybody's phone the moment they happen, and the league board in a room
lists only the people actually in it — no bots.

The app is a static file, so it needs somewhere to keep the room. A free **Firebase Realtime
Database** does the whole job over plain HTTPS: no SDK, no build step, no account for your friends.

1. Go to <https://console.firebase.google.com> and **Add project** (any name, analytics off).
2. In the left sidebar pick **Build → Realtime Database → Create Database**. Choose any location and
   **Start in test mode**.
3. Copy the URL at the top — it looks like `https://your-project-default-rtdb.firebaseio.com`.
4. In the app, open **You → Settings → Play with friends**, paste that URL, tap **New** for a room
   code, then **Join room**.
5. Send your friends the same URL and code. That's it.

Test mode leaves the database open to anyone who has the URL, which is fine for a play-money game
among friends and nothing else — there are no accounts, no passwords and no personal data in it, only
display names, coin totals and chat. Firebase turns test mode off after 30 days; extend it in
**Realtime Database → Rules**.

Leaving a room puts you straight back to solo play, and a phone that hasn't checked in for two
minutes drops off the board by itself.

## Light and dark

Both themes ship, switchable in **You → Appearance**. *Auto* follows your phone's setting and
switches with it live. Every colour in the app resolves through one set of CSS custom properties, so
there is a single stylesheet rather than a dark-mode fork.

## Install it

Add it to your home screen — **Share → Add to Home Screen** on iPhone, **⋮ → Install app** on
Android — and it opens fullscreen with no browser bar. Turn on bet alerts in **You → Settings** to
get a notification when a ticket settles, which matters when a real game takes three hours.

## Put it on your phone

The app is one self-contained file, but iOS can't install from a file — it needs an HTTPS URL. Every
file it needs sits at the repo root, so GitHub Pages can serve the repo directly:

1. Open **Settings → Pages**. Under **Source** choose **Deploy from a branch**, set the branch to
   **main** and the folder to **/ (root)**, then **Save**.
2. Wait about a minute. The site publishes at `https://<your-user>.github.io/Bob/` and re-publishes
   by itself on every push to `main`.
3. Open that URL **in Safari** on your iPhone.
4. **Share → Add to Home Screen.**

It then launches fullscreen with its own icon, no browser bar, and opens even with no signal: the
service worker caches the app shell.

Any static host works the same way — Netlify, Cloudflare Pages, or your own server — as long as it
serves the four files together over HTTPS.

### Notifications on iOS

Apple only allows web push for a web app that has been **added to the home screen** — an open Safari
tab can't ask. Install it first, then turn on alerts in **You → Settings**. Note that alerts fire
while the app is running or backgrounded; pushing to a fully closed app needs a server to send the
push, which a static site has no way to do. `sw.js` already handles a push payload if you later put
one behind it.

### Opening the file directly

Double-clicking `index.html` still works and always will — the app falls back to an inline manifest,
skips the service worker, and runs exactly the same. You just can't install it to a home screen or
receive notifications that way.

## Technical notes

- One file: `index.html`. Vanilla JS, no framework, no runtime dependencies.
- Real and simulated games share one engine behind a small interface (`gProgress`, `gScore`,
  `gIsLive`…), so betting, grading, live pricing and cash-out never need to know which kind of game
  they're looking at.
- A ticket on a real game keeps a snapshot of that game. When the game drops off today's board, the
  app fetches that event by id to grade it — so a bet placed tonight settles correctly tomorrow.
- State persists in `localStorage` under `spankbet.state.v3`. Saves from both earlier versions
  migrate automatically; corrupt or missing state falls back to a fresh account.
- The live feed degrades quietly: failures back off exponentially and the board says so.
- Multiplayer is Firebase's REST API plus one `EventSource` stream — no SDK. A room that can't be
  reached never blocks the app: the board, betting and settlement all carry on without it.
- Spank Coins are play money. Odds carry a house edge, checked against the simulation.

### Rebuilding the stylesheet

`index.html` carries a Tailwind build trimmed to only the classes the app uses, between the
`<style id="tw">` markers. After adding new utility classes, regenerate it:

```bash
tools/build-css.sh
```

That compiles `tools/input.css` with `tools/tailwind.config.js` — which maps Tailwind colours onto
the theme's CSS variables — and splices the result back into `index.html`.
