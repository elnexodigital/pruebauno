const CACHE_NAME = 'el-nexo-digital-cache-v3'; // Version bumped to ensure SW update and clear stale data
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

// Install the service worker and cache the static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
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
    })
  );
});


// Serve cached content when offline, but ensure API calls always go to the network
self.addEventListener('fetch', event => {
  // Use a network-first strategy for API calls to ensure fresh data.
  if (event.request.url.includes('googleapis.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // On failure, respond with a generic error.
        // The app itself should handle this error gracefully.
        return new Response(JSON.stringify({ error: "API call failed, possibly offline" }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }

  // For all other requests, use a cache-first strategy.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response.
        if (response) {
          return response;
        }
        // Not in cache - fetch from network.
        return fetch(event.request);
      }
    )
  );
});