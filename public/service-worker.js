const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'v1';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "/",
    "./index.html",
    "./js/index.js",
    "./css/styles.css",
    "./manifest.json",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png", 
    "./icons/icon-512x512.png",
    // "../models/transaction.js"
];
//  event listener to install service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache: ' + CACHE_NAME);
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// event listener to activate service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
                let cacheKeepList = keyList.filter(function(keyName) {
                    return keyName.indexOf(APP_PREFIX);
                });
                cacheKeepList.push(CACHE_NAME);
                return Promise.all(
                    keyList.map(function(keyName, index) {
                        if (cacheKeepList.indexOf(keyName) === -1) {
                            return caches.delete(keyList[index]);
                        }
                    })
                );
            })
        );
});

// event listener to fetch data
self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url)
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    console.log('Found ' + event.request.url + ' in cache');
                    return response;
                } else {
                console.log('File is not cached, fetching: ' +  event.request.url);
                return fetch(event.request)

            }
        })
    );
});
