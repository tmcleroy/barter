var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var underscorify = require('node-underscorify');
var sass = require('gulp-sass');
var _ = require('lodash');
var webpack = require('gulp-webpack');

gulp.task('javascript', function () {

  // return gulp.src('./client/app/app.js')
  //       .pipe(webpack({
  //         watch: true,
  //         module: {
  //           loaders: [
  //             { test: /\.ejs$/, loader: 'ejs' },
  //           ],
  //         },
  //       }
  //       ))
  //       .pipe(gulp.dest('./server/public/dist/scripts/'));
  //

  var tplTransform = underscorify.transform({
    extensions: ['ejs', 'html']
  });

  var a = browserify('./client/app/app.js', {
    debug: true // for sourcemaps
  });
  a.transform(tplTransform);
  return a.bundle()
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
  gulp.src('./client/app/styles/app.scss') // app styles
    .pipe(sass({
      style: 'compressed',
      loadPath: [ // bootstrap styles
        './node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error', sass.logError))
      .pipe(gulp.dest('./server/public/dist/styles'));
});

gulp.task('watch', function () {
  gulp.start('javascript');
  gulp.start('sass');
  gulp.watch(['client/app/**/*.js', 'client/app/**/*.ejs'], ['javascript']);
  gulp.watch(['client/app/**/*.scss'], ['sass']);
});
