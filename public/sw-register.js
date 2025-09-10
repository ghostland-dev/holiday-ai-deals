// Service Worker Registration Script
(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })
      .then(function(registration) {
        console.log('[SW] Registration successful with scope: ', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', function() {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                showUpdateNotification();
              }
            });
          }
        });

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', function(event) {
          if (event.data && event.data.type === 'DEALS_UPDATED') {
            // Refresh deals data
            window.dispatchEvent(new CustomEvent('dealsUpdated', {
              detail: event.data.payload
            }));
          }
        });

        // Register for push notifications if supported
        if ('PushManager' in window) {
          requestNotificationPermission(registration);
        }
      })
      .catch(function(err) {
        console.log('[SW] Registration failed: ', err);
      });
    });
  }

  function showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 300px;
        font-family: system-ui, sans-serif;
      ">
        <div style="font-weight: 600; margin-bottom: 8px;">
          🎉 Nouvelle version disponible
        </div>
        <div style="font-size: 14px; margin-bottom: 12px;">
          Des améliorations et nouveaux deals vous attendent !
        </div>
        <button onclick="updateApp()" style="
          background: white;
          color: #2563eb;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          margin-right: 8px;
        ">
          Mettre à jour
        </button>
        <button onclick="this.parentNode.parentNode.remove()" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
        ">
          Plus tard
        </button>
      </div>
    `;
    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  window.updateApp = function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
        window.location.reload();
      });
    }
  };

  async function requestNotificationPermission(registration) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('[SW] Notification permission granted');
        
        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(window.vapidPublicKey || 'BDd3_hVL9fZlBrr8OWMr1_w-2lF2_BZL_sY1NjC4K')
        });

        // Send subscription to server
        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription)
        });

        console.log('[SW] Push subscription successful');
      }
    } catch (error) {
      console.warn('[SW] Push notification setup failed:', error);
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
})();