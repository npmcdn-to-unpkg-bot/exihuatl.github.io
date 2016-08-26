var gulp = require('gulp');
var jade = require('gulp-jade');
var webpack = require('gulp-webpack');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var stylus  = require('gulp-stylus');
var postCSS = require('gulp-postcss');
var cssnano = require('cssnano');
var mqpacker = require('css-mqpacker');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function () {
  return browserSync.init({
    server: {
      baseDir: './'
    },
    ghostMode: false
  });
});


gulp.task('js', function () {
  return gulp.src('./src/js/app.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('scss', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('stylus', function () {
  var processors = [
    mqpacker(),
    cssnano(),
  ];
  return gulp.src('./src/stylus/style.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(postCSS(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function () {
  return gulp.src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe( browserSync.stream() );
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['js'])
  gulp.watch('./src/**/*.styl', ['stylus'])
  gulp.watch('./src/**/*.scss', ['scss'])
  gulp.watch('./src/**/*.jade', ['jade'])
  gulp.watch('./dist/app.min.js', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
