var models = require('../../models');
var utils = require('../../middleware/utils');

var handler = function (req, res) {
  var saltAndHash = utils.saltAndHashPassword(req.params.password);
  console.log(saltAndHash);
  var salt = saltAndHash.salt;
  var hash = saltAndHash.hash;

  models.User.create({
    username: req.params.username,
    password: hash,
    salt: salt
  }).then(function (user) {
    res.send(user);
  });
};

module.exports = handler;
