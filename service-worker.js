/**
 * service-worker.js
 *
 * Note: It is important to note that while this event is happening, any 
 * previous version of your service worker is still running and serving pages, 
 * so the things you do here must not disrupt that. For instance, this is not 
 * a good place to delete old caches, because the previous service worker may 
 * still be using them at this point.
 *
 * @link https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

'use strict';

/** @const filesToCache Array A list of files to store in cache */
const filesToCache = [
    //Pages
    '/index.html',
    '/equipo.html',
    '/terminos.html',
    '/privacidad.html',
    '/pokedex.html',
    '/raid.html',

    // Styles
    '/css/main.css',
    '/css/bootstrap.min.css',

    // JS
    '/js/bootstrap.min.js',
    '/js/app.js',
    '/js/equipo.js',
    '/js/index.js',

    // Imgs
    '/images/pokeball.png',
    '/images/hero-skyline.png',
    '/images/pokemon_go_logo.png',
    '/images/no-pokemon.png',
    '/images/entrenador.png',
    '/images/charge_battery.png',
    '/images/header-background-sticky.png',
    '/images/offline.png',
];

/** @const staticCacheName String The name of the version. Update it to get the new files */
const staticCacheName = 'pages-cache-v11';

// When the service worker is installed...
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Opened cache');
            self.skipWaiting();
            return cache.addAll(filesToCache);
        })
    );
});
/*self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([caches.open(staticCacheName),self.skipWaiting()]).then(function(storage){
            var static_cache = storage[0];
            return Promise.all([static_cache.addAll(filesToCache)]);
        })
    );
});*/

// Every time a resource is fetch...
/*self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Return the cache or fetch in the network
            console.log (event.request.url + " " + (response ? "in cache" : "not in cache"));
            return fetch(event.request) || response;
        })
    );
});
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(async function() {
      const cache = await caches.open(staticCacheName);
      const cachedResponse = await cache.match(event.request);
      const networkResponsePromise = fetch(event.request);
  
      event.waitUntil(async function() {
        const networkResponse = await networkResponsePromise;
        await cache.put(event.request, networkResponse.clone());
      }());

      // Returned the cached response if we have one, otherwise return the network response.
      return cachedResponse || networkResponsePromise;
    }());
  });

/**
 * Removing outdated caches
 *
 * Once a new service worker has installed and a previous version 
 * isn't being used, the new one activates, and you get an activate event. 
 * Because the old version is out of the way, it's a good time 
 * to delete unused caches.
 */
self.addEventListener ('activate', (event) => {
    event.waitUntil(async function() {
        const cacheNames = await caches.keys()
        await Promise.all(
            cacheNames.filter((cacheName) => {
                if (cacheName !== staticCacheName){
                    console.log("Deleted cache")
                    return true
                }
            }).map(cacheName => caches.delete(cacheName))
        );
    }());
});