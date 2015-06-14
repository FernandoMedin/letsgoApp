var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserSync = require('browser-sync');

var paths = {
    sass : ['./scss/**/*.scss', './scss/**/*.sass']
  , js   : ['./www/js/app/**/*.js']
};

gulp.task('browser-sync', ['serve'], function () {
    browserSync.init(null, {
        proxy: "localhost:8100"
      , port: 9000
      , open: true
    });
});

gulp.task('sass', function() {
    return gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('script', function(){
    sh.exec('rm www/js/app.min.js');
    return gulp.src(paths.js)
    .pipe(concat('app.min.js'))
    // .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['script'], function(){
        browserSync.reload('app.min.js', { stream: true });
    });
});

gulp.task('serve', function(){
    sh.exec([ 'ionic serve' ]);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
    .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('default', ['sass', 'script' ]);
