var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/GA.html',
  '/GA.js',
  '/p5.js',
];
console.log('adding install listener')
self.addEventListener('install', (e) => {
  console.log('running install event')
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
      );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
