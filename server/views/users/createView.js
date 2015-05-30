var models = require('../../models');

var handler = function (req, res) {
  models.User.create({ username: req.params.username })
    .then(function (user) {
      res.send(user);
    });
};

module.exports = handler;
