# Spank Betting

A single-file social sports prediction app played with **Spank Coins** — virtual currency with no
cash value. Nothing can be bought, deposited, cashed out for real money, or traded.

Open `index.html` in any browser. No build step, no server, no API key.

## Real games only

Live matchups from ESPN's public feed across **NFL, college football, NBA, college basketball, MLB and
NHL**, covering a full calendar week — yesterday's finals through five days ahead — with real teams,
records, scores, game clocks and real sportsbook spreads and totals. College teams carry their AP
poll number, the way a broadcast writes it. Moneylines come from the feed where published and are derived from the
real spread otherwise. Once a game starts, every market is re-priced from the score and time
remaining, and decided markets come off the board. A price already in your slip is locked and never
moves.

Games are grouped by day, newest first. The Daily Pick is always a game happening today.

A college division runs to hundreds of teams and one Saturday can carry sixty games, so the college
boards are trimmed to the best twenty-five a day: contests ahead of walkovers, ranked teams ahead of
unranked, with the last few slots kept for the big names even when they are playing a cupcake.

No market is offered once one side is more than 80% likely — before kickoff or during the game. Early
college football is full of −1500 favourites, and a play-money game whose difficulty comes from a
daily bankroll can't have a risk-free grind sitting on the board. Those games keep their spread and
total, which is how people bet them anyway.

## A small bankroll, and a real lockout

You start with **500 coins**. Lose them all and that is your day — betting is closed until midnight,
when a fresh 500 lands. There is no bailout button, so the coins have to mean something.

Coins that survive can be spent in the **prize shop** on permanent badges.

## Everyone plays together

There are **no bots anywhere in this app**. The chat, the bet ticker and the leaderboard are real
people or they are empty. Open the link and you are in the main chat with everyone else who has it
open — nothing to type, no sign-up.

Two things you can do beyond that, and nothing else is asked of anybody:

- **Create a chat.** Name it, and you get a link to send. Whoever opens that link lands straight in
  the chat, already joined, on the chat screen. They can type the five-character code instead if the
  link is awkward to pass on.
- **Join a chat.** Paste a link or type a code.

A link is the site URL with `#c=CODE` on the end. The app reads it on open, joins that chat, and
tidies the URL away.

### Switching chats on

Nobody is ever asked for a server address — the app knows where its own server is. Setting that up is
a one-time job for whoever hosts the app, and it is free: a **Firebase Realtime Database** does the
whole thing over plain HTTPS, no SDK and no build step.

1. Go to <https://console.firebase.google.com> and **Add project** (any name, analytics off).
2. In the left sidebar pick **Build → Realtime Database → Create Database**. Choose any location and
   **Start in test mode**.
3. Copy the URL at the top — it looks like `https://your-project-default-rtdb.firebaseio.com`.
4. Paste it into **`config.json`** next to `index.html`:

   ```json
   { "server": "https://your-project-default-rtdb.firebaseio.com" }
   ```

5. Push. Chats are on for everybody, with no further setup for anyone.

Until that URL is set the app runs solo and says so plainly: the board, betting, settlement, streaks
and the prize shop all work, and the chat panel says chats aren't switched on yet rather than
pretending otherwise.

Test mode leaves the database open to anyone who has the URL, which is fine for a play-money game and
nothing else — there are no accounts, no passwords and no payment details in it, only display names,
coin totals and chat. Firebase turns test mode off after 30 days; extend it in
**Realtime Database → Rules**.

A phone that hasn't checked in for two minutes drops off the board by itself, and leaving a chat
clears your row on the way out.

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
serves the files together over HTTPS.

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
- The server address lives in `config.json`, fetched at boot and never cached by the service worker,
  so it can change without rebuilding the app. It appears nowhere in the interface.
- A chat's name lives on the room itself, so a link carries only the code and everyone reads the name
  off the server.
- League rank is earned from your own lifetime XP (Bronze at 0 through Diamond at 12,000). There is
  no promotion or relegation against a field, because there is no field to invent.
- Spank Coins are play money. Odds carry a house edge, checked against the simulation.

### Rebuilding the stylesheet

`index.html` carries a Tailwind build trimmed to only the classes the app uses, between the
`<style id="tw">` markers. After adding new utility classes, regenerate it:

```bash
tools/build-css.sh
```

That compiles `tools/input.css` with `tools/tailwind.config.js` — which maps Tailwind colours onto
the theme's CSS variables — and splices the result back into `index.html`.
