var bcrypt = require('bcrypt');
var AWS = require('aws-sdk');
var fs = require('fs');

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

  s3: {
    uploadAvatar: function (path, fname) {
      // Read in the file, convert it to base64, store to S3
      fs.readFile(path, function (err, data) {
        console.log('DATA -------------------------------');
        console.log(data);
        if (err) { throw err; }

        var credentials = new AWS.SharedIniFileCredentials({profile: 'barter'});
        AWS.config.credentials = credentials;

        var s3 = new AWS.S3();
        s3.putObject({
          Bucket: 'barter.app',
          Key: fname,
          Body: data
        }, function (resp) {
          console.log(resp);
          console.log('Successfully uploaded package.');
        });

      });
    }
  }
};

module.exports = utils;
