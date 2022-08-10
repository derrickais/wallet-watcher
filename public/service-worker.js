const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./manifest.json",
    "icons/icon-72x72.png",
    "icons/icon-96x96.png",
    "icons/icon-128x128.png",
    "icons/icon-144x144.png",
    "icons/icon-152x152.png",
    "icons/icon-192x192.png",
    "icons/icon-384x384.png",
    "icons/icon-512x512.png",
];
const APP_PREFIX = 'WalletWatch-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
        })
    )
})  

self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (request) {
        if (request && !e.request?.url.includes('api/transaction')) { // if cache is available, respond with cache
          return request
        }
        return fetch(e.request)
      })
    )
  })