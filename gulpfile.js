var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var awspublish = require('gulp-awspublish');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$.parallelize = require('concurrent-transform');
$.runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var packageJson = require('./package.json');

gulp.task('dev', function (cb) {
  var devConfig = require('./webpack.config.dev')();
  var compiler = webpack(devConfig);

  var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'client/app'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: '/',
    stats: { colors: true }
  });

  server.listen(packageJson.appConfig.devPort, 'localhost', function () {});
});

gulp.task('deploy', function (cb) {
  return $.runSequence('clean', 'dist', 'publish', cb);
});

gulp.task('dist', function (cb) {
  var distConfig = require('./webpack.config.dist')();
  webpack(distConfig, function (err, stats) {
    if (err) {
      throw new $.util.PluginError('dist', err);
    }

    $.util.log('[dist]', stats.toString({
      colors: true
    }));

    cb();
  });
});

gulp.task('publish', function (cb) {
  var awsCredentials = JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials.json'))[packageJson.appConfig.s3.profile];

  var publisher = awspublish.create({
    accessKeyId: awsCredentials.aws_access_key_id,
    secretAccessKey: awsCredentials.aws_secret_access_key,
    region: packageJson.appConfig.s3.region,
    params: {
      Bucket: packageJson.appConfig.s3.bucket
    }
  });

  var target = argv.target;

  if (!target) {
    throw new $.util.PluginError('publish', 'Specify a target using --target=<name>');
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

gulp.task('clean', function () {
  return gulp.src(['.dev', 'server/public/dist'])
    .pipe($.clean());
});
