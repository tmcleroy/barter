var lwip = require('lwip');
var utils = require('../utils/utils.js')
var fs = require('fs');

var handler = function (req, res) {
  var fname = 'avatar-' + (req.user.id || 'null') + '.png';
  lwip.open(req.files.file.path, function (err, image) {
    if (!err) {
      image.batch()
        .resize(100, 100)
        .toBuffer('png', function (err, buffer) {
          if (!err) {
            utils.S3.uploadAvatar(buffer, fname, function () {
              fs.unlink(req.files.file.path, function (err) {
                if (!err) {
                  console.log(req.files.file.path + ' file removed');
                  req.user.set('avatar', null);
                  req.user.save();
                }
              });
            });
          }
        });
    }
  });
  res.send('file uploaded');
};

module.exports = handler;
