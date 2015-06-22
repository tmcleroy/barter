var bcrypt = require('bcrypt');
var AWS = require('aws-sdk');

var S3_CONFIG = {
  profile: 'barter',
  region: 'us-west-2',
  bucket: 'barter.app'
};

function passwordAndHashMatch (password, hash) {
  return bcrypt.compareSync(password, hash);
}

var utils = {
  auth: {
    getPasswordHash: function (password) {
      var saltWorkFactor = 10;
      var salt = bcrypt.genSaltSync(saltWorkFactor);
      var hash = bcrypt.hashSync(password, salt);

      var isMatch = passwordAndHashMatch(password, hash);
      return (isMatch ? hash : null);
    },

    passwordAndHashMatch: passwordAndHashMatch
  },

  S3: {
    uploadAvatar: function (buffer, fname, cb) {
      AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: S3_CONFIG.profile });
      AWS.config.region = S3_CONFIG.region;

      var s3 = new AWS.S3();
      s3.putObject({
        Bucket: S3_CONFIG.bucket,
        Key: 'public/avatars/' + fname,
        Body: buffer
      }, function (err) {
        if (!err) {
          console.log('S3 upload successful');
          cb();
        }
      });
    }
  }
};

module.exports = utils;
