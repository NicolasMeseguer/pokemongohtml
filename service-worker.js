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
    '/js/equipo.js',

    // Styles
    '/css/main.css',
    '/css/bootstrap.min.css',

    // JS
    '/js/bootstrap.min.js',

    // Imgs
    '/images/pokeball.png',
    '/images/hero-skyline.png',
    '/images/pokemon_go_logo.png',
    '/images/no-pokemon.png',
    '/images/entrenador.png',
];

/** @const staticCacheName String The name of the version. Update it to get the new files */
const staticCacheName = 'pages-cache-v2';

// When the service worker is installed...
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

// Every time a resource is fetch...
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Return the cache or fetch in the network
            console.log (event.request.url + " " + (response ? "in cache" : "not in cache"));
            return response || fetch(event.request);
        })
    );
});

/**
 * Removing outdated caches
 *
 * Once a new service worker has installed and a previous version 
 * isn't being used, the new one activates, and you get an activate event. 
 * Because the old version is out of the way, it's a good time 
 * to delete unused caches.
 */
 /*self.addEventListener ('activate', function(event) {
    event.waitUntil (
        caches.keys().then (function (filesToCache) {
            return Promise.all (
                filesToCache.filter (function (cacheName) {
                    return true;
                }).map (function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});*/