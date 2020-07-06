const gulp = require('gulp');

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

function style() {
  return gulp.src('./**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./src'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  style();
  gulp.watch('./**/*.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
