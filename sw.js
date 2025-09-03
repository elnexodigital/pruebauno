const CACHE_NAME = 'el-nexo-digital-cache-v4'; // Version bumped to ensure SW update
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/index.tsx',
  'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png',
  'https://res.cloudinary.com/ddmj6zevz/raw/upload/v1756916641/brittany_ifg3wl.ttf',
  'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756588189/pexels-life-of-pix-8892_ymfsnd.jpg'
];

// Install the service worker and cache the static assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Clean up old caches on activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages under its scope immediately.
  );
});

// Fetch handler: cache-first for assets, network-first for APIs.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for API calls to ensure fresh data.
  if (url.hostname.includes('googleapis.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: "API call failed, device is offline" }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }

  // For all other requests, use a cache-first, then network-with-caching strategy.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Cache hit - return response.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Not in cache - fetch from network, then cache it.
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response.
            if (
              !networkResponse || 
              networkResponse.status !== 200 || 
              (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')
            ) {
              return networkResponse;
            }

            // Clone the response. A response is a stream and can only be consumed once.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // We only cache GET requests that are not from Chrome extensions.
                if (event.request.method === 'GET' && !url.protocol.startsWith('chrome-extension')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return networkResponse;
          }
        );
      }
    )
  );
});
