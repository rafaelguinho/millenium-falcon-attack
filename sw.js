self.addEventListener('install', function(event) {
  event.waitUntil(

    caches.open('v11').then(function(cache) {
      return cache.addAll([
        '',
        '/',
        'index.html',
        'credits.html',
        'style/fonts.css',
        'style/game.css',
        'style/reset.css',
        'fonts/lcd_solid-webfont.eot',
        'fonts/lcd_solid-webfont.svg',
        'fonts/lcd_solid-webfont.ttf',
        'fonts/lcd_solid-webfont.woff',
        'fonts/lcd_solid-webfont.woff2',
        'fonts/Starjedi.ttf',
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
        'snd/explosion.mp3',
        'snd/tir.mp3',
        'dist/all.4.js',
        'launcher-icon-2x.png',
        'launcher-icon-3x.png',
        'launcher-icon-4x.png',
        'favicon-16x16.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response){
      if(response)
        return response;
      return fetch(event.request).then(function(response){
        return response;
      });
  }));
});