self.importScripts('/static/offline.js');
/* eslint-disable no-undef */
if ('workbox' in self) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // set up routes to cache
  // see more about strategies in https://developers.google.com/web/tools/workbox/modules/workbox-strategies
  [
    {
      regex: /\.(?:png|jpg|jpeg|svg)(?:\?.*)?$/,
      strategy: new workbox.strategies.CacheFirst({
        cacheName: 'assets',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [200] }),
          new workbox.expiration.Plugin({
            maxEntries: 50,
            // one hour
            maxAgeSeconds: 3600,
            purgeOnQuotaError: false,
          }),
        ],
      }),
    },

    {
      regex: /^https:\/\/res\.cloudinary.com\/.*\.(?:png|jpg|jpeg|svg)(?:\?.*)?$/,
      strategy: new workbox.strategies.CacheFirst({
        cacheName: 'assets-external',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [200] }),
          new workbox.expiration.Plugin({
            maxEntries: 50,
            // one hour
            maxAgeSeconds: 3600,
            purgeOnQuotaError: true,
          }),
        ],
      }),
    },

    {
      regex: /\.(?:js)(?:\?.*)?$/,
      strategy: new workbox.strategies.NetworkFirst({
        cacheName: 'js-files',
        networkTimeoutSeconds: 10,
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [200] }),
          new workbox.expiration.Plugin({
            maxEntries: 100,
            // one day
            maxAgeSeconds: 86400,
            purgeOnQuotaError: false,
          }),
        ],
      }),
    },

    {
      regex: /\/.*/,
      strategy: new workbox.strategies.NetworkFirst({
        cacheName: 'offline',
        plugins: [
          new workbox.cacheableResponse.Plugin({ statuses: [200] }),
          new workbox.expiration.Plugin({
            maxEntries: 30,
            networkTimeoutSeconds: 5,
            // one week
            maxAgeSeconds: 604800,
            purgeOnQuotaError: false,
          }),
        ],
      }),
    },
  ].forEach(({ regex, strategy }) => {
    workbox.routing.registerRoute(regex, strategy, 'GET');
  });
}
