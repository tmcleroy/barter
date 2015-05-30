var models = require('../../models');

var handler = function (req, res) {
  models.User.findById(req.params.id)
    .then(function (user) {
      res.send(user);
    });
};

module.exports = handler;
