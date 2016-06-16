self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v4').then(function(cache) {
      return cache.addAll([
        'index.html',
        'img/*',
        'fonts/*',
        'style/*',
        'snd/*',
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