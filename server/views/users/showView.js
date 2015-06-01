var User = require('../../models').User;

var handler = function (req, res) {
  User.findById(req.params.id)
    .then(function (user) {
      res.send(user);
    });
};

module.exports = handler;
