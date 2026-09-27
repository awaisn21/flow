// bump this string whenever any app file changes, so installed copies pick up the update
const SHELF = 'flow-shell-v1';

const FILES = [
  './',
  './index.html',
  './support.js',
  './manifest.webmanifest',
  './fonts/fonts.css',
  './fonts/public-sans-latin-400-normal.woff2',
  './fonts/public-sans-latin-500-normal.woff2',
  './fonts/public-sans-latin-600-normal.woff2',
  './fonts/public-sans-latin-700-normal.woff2',
  './fonts/sora-latin-500-normal.woff2',
  './fonts/sora-latin-600-normal.woff2',
  './fonts/sora-latin-700-normal.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (evt) =>
{
  evt.waitUntil(caches.open(SHELF).then((box) => box.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (evt) =>
{
  const sweep = caches.keys().then((names) =>
  {
    const stale = names.filter((n) => n !== SHELF);
    return Promise.all(stale.map((n) => caches.delete(n)));
  });
  evt.waitUntil(sweep.then(() => self.clients.claim()));
});

// cache first: the app never waits on the network, and works with wifi off
self.addEventListener('fetch', (evt) =>
{
  const req = evt.request;
  if (req.method !== 'GET')
  {
    return;
  }
  const isPage = req.mode === 'navigate';
  evt.respondWith(
    caches.match(isPage ? './index.html' : req, { ignoreSearch: true }).then((hit) =>
    {
      if (hit)
      {
        return hit;
      }
      return fetch(req);
    })
  );
});
