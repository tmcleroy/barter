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

  // return gulp.src('./client/app/app-marketing.js')
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



  // try {
  //   var destDir = './server/public/dist/scripts/';
  //
  //   var bundleThis = function(srcArray, opts) {
  //     _.each(srcArray, function(src) {
  //       console.log(src);
  //       var bundle = browserify('./client/app/' + src + '.js', opts).bundle();
  //       bundle.pipe(source('./' + src + '.js'))
  //         .pipe(buffer())
  //         .pipe(sourcemaps.init({loadMaps: true}))
  //           .pipe(uglify())
  //           .on('error', gutil.log)
  //         .pipe(sourcemaps.write('./app/'))
  //         .pipe(gulp.dest(destDir));
  //     });
  //   };
  //
  //   bundleThis(['app-marketing', 'app-main'], { debug: true });
  // } catch (e) {
  //   console.log('errrrrr');
  //   console.log(e);
  // }








  var tplTransform = underscorify.transform({
    extensions: ['ejs', 'html']
  });

  // marketing site
  var a = browserify('./client/app/app-marketing.js', {
    debug: true // for sourcemaps
  });
  // main app
  var b = browserify('./client/app/app-main.js', {
    debug: true // for sourcemaps
  });

  a.transform(tplTransform);
  b.transform(tplTransform);

  a.bundle() // marketing site
    .pipe(source('./app-marketing.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./app/'))
    .pipe(gulp.dest('./server/public/dist/scripts/'));

  return b.bundle() // marketing site
    .pipe(source('./app-main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./app/'))
    .pipe(gulp.dest('./server/public/dist/scripts/'));
});

gulp.task('sass', function () { // styles shared by marketing and main site
  gulp.src('./client/app/styles/app.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: [
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
