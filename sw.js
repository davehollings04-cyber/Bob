/* Service worker for the hosted build of Spank Betting.
 *
 * index.html is self-contained, so this only has to do three things:
 *   1. keep the app openable with no connection
 *   2. never cache the live sports feed
 *   3. handle a push payload, which iOS only allows for an installed web app
 *
 * Opening index.html straight from disk skips this file entirely — the app
 * still runs, it just has no push and relies on the browser cache.
 */
const CACHE = 'spankbet-v3';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => {}))   // a missing file must not fail the install
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // scores and odds are never served from cache — stale prices are worse than none
  if (url.origin !== self.location.origin) return;

  // network first for the page itself, so a new deploy lands on the next open
  if (req.mode === 'navigate' || url.pathname.endsWith('index.html')){
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // icons and the manifest can come from cache
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => hit))
  );
});

/* A push needs a server to send it. Without one this never fires, and the app
   falls back to showing alerts while it is running. */
self.addEventListener('push', e => {
  let data = { title: 'Spank Betting', body: 'A ticket settled.' };
  try { if (e.data) data = Object.assign(data, e.data.json()); } catch (err) { /* plain text payload */ }
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: 'spankbet'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow ? self.clients.openWindow('./index.html') : null;
    })
  );
});
