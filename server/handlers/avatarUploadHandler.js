var lwip = require('lwip');

var handler = function (req, res) {
  console.log('files? =======================================================');
  console.log(req.files);
  lwip.open(req.files.file.path, function (err, image) {
    image.resize(100, 100, function (err, image) {
      image.writeFile('new.png', function (err) {
        if (!err) {
          console.log('success');
        }
      });
    });
  });
  res.send('file uploaded');
};

module.exports = handler;
