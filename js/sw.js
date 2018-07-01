let localCacheName = 'fend-restaurant-review-v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(localCacheName).then(cache => {
            return cache.addAll([
                '../',
                '../js/main.js',
                '../js/restaurant_info.js',
                '../css/styles.css',
                '../index.html',
                '../restaurant.html',
                '../img/1.jpg',
                '../img/2.jpg',
                '../img/3.jpg',
                '../img/4.jpg',
                '../img/5.jpg',
                '../img/6.jpg',
                '../img/7.jpg',
                '../img/8.jpg',
                '../img/9.jpg',
                '../img/10.jpg',
                '../data/restaurants.json'
            ])
        }))
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('fend-') &&
                        cacheName !== localCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});