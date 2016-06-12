var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
 
gulp.task('scripts', function() {
  return gulp.src(["engine/animacao.js",
"engine/colisor.js",
"engine/spritesheet.js",
"engine/touch.js",
"engine/teclado.js",

"game/fundo.js",
"game/milleniumFalcon.js",
"game/tieFighter.js",
"game/asteroid.js",
"game/tiro.js",
"game/explosao.js",
"game/painel.js",

"game/inicializador.js",

])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
  // place code for your default task here
});
