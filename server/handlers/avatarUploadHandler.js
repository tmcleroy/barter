var lwip = require('lwip');
var utils = require('../utils/utils.js')

var handler = function (req, res) {
  console.log('files? =======================================================');
  console.log(req.files);
  var fname = 'new.png';
  lwip.open(req.files.file.path, function (err, image) {
    image.resize(100, 100, function (err, image) {
      image.writeFile(fname, function (err) {
        if (!err) {
          console.log('success writing file');
          utils.s3.uploadAvatar(fname, 'blah.png');
        }
      });
    });
  });
  res.send('file uploaded');
};

module.exports = handler;
