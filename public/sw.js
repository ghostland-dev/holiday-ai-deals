// TravelAI Service Worker - PWA + Caching + Push Notifications

const CACHE_NAME = 'travelai-v1.0.0';
const STATIC_CACHE = 'travelai-static-v1';
const DYNAMIC_CACHE = 'travelai-dynamic-v1';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/deals/,
  /\/api\/destinations/,
  /\/api\/ai-packs/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests with cache-first strategy for deals
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE)
        .then(cache => {
          return cache.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                // Serve from cache, update in background
                fetch(request)
                  .then(networkResponse => {
                    if (networkResponse.ok) {
                      cache.put(request, networkResponse.clone());
                    }
                  })
                  .catch(() => {
                    console.log('[SW] Network update failed for:', request.url);
                  });
                return cachedResponse;
              }

              // Not in cache, fetch from network
              return fetch(request)
                .then(networkResponse => {
                  if (networkResponse.ok) {
                    cache.put(request, networkResponse.clone());
                  }
                  return networkResponse;
                })
                .catch(() => {
                  // Return offline page or cached fallback
                  return new Response(
                    JSON.stringify({ 
                      error: 'Offline', 
                      message: 'Content not available offline' 
                    }),
                    {
                      status: 503,
                      headers: { 'Content-Type': 'application/json' }
                    }
                  );
                });
            });
        })
    );
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Serve cached homepage when offline
          return caches.match('/');
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse.ok && request.url.startsWith(self.location.origin)) {
              const responseClone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return networkResponse;
          });
      })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'Nouveau deal voyage disponible !',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    image: data.image,
    tag: data.tag || 'travel-deal',
    data: {
      url: data.url || '/',
      dealId: data.dealId
    },
    actions: [
      {
        action: 'view',
        title: 'Voir le Deal',
        icon: '/icon-192x192.png'
      },
      {
        action: 'dismiss',
        title: 'Ignorer'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'TravelAI - Nouveau Deal !',
      options
    )
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  
  notification.close();

  if (action === 'dismiss') {
    return;
  }

  // Default action or 'view' action
  const urlToOpen = notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle queued offline actions
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  // Handle offline search queries, bookmarks, etc.
  console.log('[SW] Background sync triggered');
  
  try {
    // Process any queued offline actions stored in IndexedDB
    const pendingActions = await getStoredActions();
    
    for (const action of pendingActions) {
      try {
        await processAction(action);
        await removeStoredAction(action.id);
      } catch (error) {
        console.log('[SW] Failed to process action:', action, error);
      }
    }
  } catch (error) {
    console.log('[SW] Background sync failed:', error);
  }
}

async function getStoredActions() {
  // Retrieve actions from IndexedDB (implement based on your needs)
  return [];
}

async function processAction(action) {
  // Process the action (API call, etc.)
  return fetch(action.url, action.options);
}

async function removeStoredAction(actionId) {
  // Remove processed action from IndexedDB
  console.log('[SW] Removing processed action:', actionId);
}

// Periodic background sync for fresh deals
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'fresh-deals') {
    event.waitUntil(refreshDeals());
  }
});

async function refreshDeals() {
  try {
    const response = await fetch('/api/deals/latest');
    if (response.ok) {
      const deals = await response.json();
      
      // Update cache
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put('/api/deals/latest', new Response(JSON.stringify(deals)));
      
      // Send update to open clients
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'DEALS_UPDATED',
          payload: deals
        });
      });
      
      console.log('[SW] Deals refreshed successfully');
    }
  } catch (error) {
    console.log('[SW] Failed to refresh deals:', error);
  }
}