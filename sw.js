self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v4').then(function(cache) {
      return cache.addAll([
        'index.html',
        'style/fonts.css',
        'style/game.css',
        'style/reset.css',
        'dist/all.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});