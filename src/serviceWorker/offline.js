/* eslint-disable no-undef */
if ('workbox' in self) {
  workbox.skipWaiting();
  workbox.clientsClaim();

  // cache name
  workbox.core.setCacheNameDetails({
    prefix: 'My-awesome-cache',
    precache: 'precache',
    runtime: 'runtime',
  });

  // runtime cache
  // 1. stylesheet
  workbox.routing.registerRoute(
    new RegExp('.css$'),
    workbox.strategies.cacheFirst({
      cacheName: 'My-awesome-cache-Stylesheets',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
          maxEntries: 20, // only cache 20 request
          purgeOnQuotaError: true,
        }),
      ],
    })
  );
  // 2. images
  workbox.routing.registerRoute(
    new RegExp('.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
      cacheName: 'My-awesome-cache-Images',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 7,
          maxEntries: 50,
          purgeOnQuotaError: true,
        }),
      ],
    })
  );
}

const CACHE_NAME = 'offline';
const OFFLINE_URL = '/';

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await cache.addAll([OFFLINE_URL]);
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});
