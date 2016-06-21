self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v5').then(function(cache) {
      return cache.addAll([
        'index.html',
        'style/',
        'style/fonts.css',
        'style/game.css',
        'style/reset.css',
        'fonts/',
        'fonts/lcd_solid-webfont.eot',
        'fonts/lcd_solid-webfont.svg',
        'fonts/lcd_solid-webfont.ttf',
        'fonts/lcd_solid-webfont.woff',
        'fonts/lcd_solid-webfont.woff2',
        'fonts/Starjedi.ttf',
        'img/',
        'img/asteroid.png',
        'img/botao-jogar.png',
        'img/credits.svg',
        'img/explosao.png',
        'img/logo.svg',
        'img/nave-vida.png',
        'img/space.png',
        'img/sprite-nave.png',
        'img/start.svg',
        'img/tie.png',
        'snd/',
        'snd/explosao.mp3',
        'snd/musica-acao.mp3',
        'snd/tiro.mp3',
        'dist/',
        'dist/all.js',
        'launcher-icon-2x.png',
        'launcher-icon-3x.png',
        'launcher-icon-4x.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});