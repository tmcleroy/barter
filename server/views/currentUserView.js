var models = require('../models');

var handler = function (req, res) {
  var status = req.user ? 200 : 404;
  res.status(status);
  res.send(req.user);
};

module.exports = handler;
