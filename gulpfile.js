var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var underscorify = require('node-underscorify');
var sass = require('gulp-sass');

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify('./client/app/main.js', {
    debug: true // for sourcemaps
  });

  var tplTransform = underscorify.transform({
    extensions: ['ejs', 'html']
  });
  b.transform(tplTransform);

  return b.bundle()
    .pipe(source('./app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./app/'))
    .pipe(gulp.dest('./server/public/dist/scripts/'));
});

gulp.task('sass', function () {
  gulp.src('./client/app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./server/public/dist/styles'));
});

gulp.task('watch', function () {
  gulp.start('javascript');
  gulp.start('sass');
  gulp.watch(['client/app/**/*.js', 'client/app/**/*.ejs'], ['javascript']);
  gulp.watch(['client/app/**/*.scss'], ['sass']);
});
