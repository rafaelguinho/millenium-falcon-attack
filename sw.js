self.addEventListener('install', function(event) {
  event.waitUntil(

    caches.open('v12').then(function(cache) {
      return cache.addAll([
        '/millenium-falcon-attack/',
        '/millenium-falcon-attack/index.html',
        '/millenium-falcon-attack/credits.html',
        '/millenium-falcon-attack/style/fonts.css',
        '/millenium-falcon-attack/style/game.css',
        '/millenium-falcon-attack/style/reset.css',
        '/millenium-falcon-attack/fonts/lcd_solid-webfont.eot',
        '/millenium-falcon-attack/fonts/lcd_solid-webfont.svg',
        '/millenium-falcon-attack/fonts/lcd_solid-webfont.ttf',
        '/millenium-falcon-attack/fonts/lcd_solid-webfont.woff',
        '/millenium-falcon-attack/fonts/lcd_solid-webfont.woff2',
        '/millenium-falcon-attack/fonts/Starjedi.ttf',
        '/millenium-falcon-attack/img/asteroid.png',
        '/millenium-falcon-attack/img/botao-jogar.png',
        '/millenium-falcon-attack/img/credits.svg',
        '/millenium-falcon-attack/img/explosao.png',
        '/millenium-falcon-attack/img/logo.svg',
        '/millenium-falcon-attack/img/nave-vida.png',
        '/millenium-falcon-attack/img/space.png',
        '/millenium-falcon-attack/img/sprite-nave.png',
        '/millenium-falcon-attack/img/start.svg',
        '/millenium-falcon-attack/img/tie.png',
        '/millenium-falcon-attack/snd/explosion.mp3',
        '/millenium-falcon-attack/snd/tir.mp3',
        '/millenium-falcon-attack/dist/all.4.js',
        '/millenium-falcon-attack/launcher-icon-2x.png',
        '/millenium-falcon-attack/launcher-icon-3x.png',
        '/millenium-falcon-attack/launcher-icon-4x.png',
        '/millenium-falcon-attack/favicon-16x16.png',
        '/millenium-falcon-attack/img/I.jpg'
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