var CACHE_NAME = 'my-site-cache-v1';
var urlsTCache = [
  '/Anastasia/Anastasia.html',
  '/Anastasia/1.jpg',
  '/Anastasia/2.jpg',
  '/Anastasia/3.jpg',
  '/Anastasia/4.jpg',
  '/Anastasia/5.jpg',
  '/Anastasia/6.jpg',
  '/Anastasia/stylesheets/style.css',
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
