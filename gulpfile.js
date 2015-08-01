var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$.parallelize = require('concurrent-transform');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var underscorify = require('node-underscorify');
var sass = require('gulp-sass');
var awspublish = require('gulp-awspublish');

var S3_CONFIG = {
  profile: 'barter',
  region: 'us-west-2',
  bucket: 'barter.app'
};


gulp.task('watch', function () {
  gulp.start('javascript');
  gulp.start('sass');
  gulp.watch(['client/app/**/*.js', 'client/app/**/*.ejs'], ['javascript']);
  gulp.watch(['client/app/**/*.scss'], ['sass']);
});

gulp.task('deploy', function () {
  var awsCredentials = JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials.json')).barter;

  var publisher = awspublish.create({
    accessKeyId: awsCredentials.aws_access_key_id,
    secretAccessKey: awsCredentials.aws_secret_access_key,
    region: S3_CONFIG.region,
    params: {
      Bucket: S3_CONFIG.bucket
    }
  });

  var target = argv.target;

  if (!target) {
    throw new gutil.PluginError('publish', 'Specify a target using --target=<name>');
  }

  var destPath = 'public/dist/' + target + '/';
  var headers = {
    'Cache-Control': 'max-age=60, must-revalidate'
  };
  return gulp.src('server/public/dist/**/*')
    .pipe($.rename(function (p) {
      p.dirname = path.join(destPath, p.dirname);
    }))
    .pipe($.parallelize(publisher.publish(headers), 5))
    .pipe(awspublish.reporter());
});

gulp.task('javascript', function () {

  var tplTransform = underscorify.transform({
    extensions: ['ejs', 'html']
  });

  return browserify('./client/app/app.js', { debug: true /* for sourcemaps */ })
    .transform(babelify)
    .transform(tplTransform)
    .bundle()
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
  gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*') // bootstrap fonts
    .pipe(gulp.dest('./server/public/dist/fonts/bootstrap'));

  gulp.src('./client/app/styles/app.scss') // app styles
    .pipe(sass({
      style: 'compressed',
      loadPath: [ // bootstrap styles
        './node_modules/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error', sass.logError))
      .pipe(gulp.dest('./server/public/dist/styles'));
});
