// Cache means storage of the browser
const CACHE_NAME = "version-1"

const urlsToChache = ['index.html', 'offline.html']

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                if(navigator.serviceWorker){
                    req = navigator.serviceWorker.ready;
                    req.update();
                }
                console.log('Opened cache')
                return cache.addAll(urlsToChache)
            })
    )
})
// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})
// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    if(!cacheWhiteList.includes(cacheName)) {
                        console.log('cashes');
                        return caches.delete(cacheName)
                    }
                })
            ))
    )
})

