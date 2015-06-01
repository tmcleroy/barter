var User = require('../../models').User;
var utils = require('../../utils');

var handler = function (req, res) {
  User.findOne({ where: { username: req.params.username } })
    .then(function (user) {
      if (!user) { // user doesn't exist, attempt to create it
        User.create({
          username: req.params.username,
          password: utils.auth.getPasswordHash(req.params.password)
        }).then(function (user) {
          res.status(200);
          res.send(user);
        });
      } else { // user already exists
        console.log('user already exists');
        res.status(500);
        res.send('user already exists');
      }
    });


};

module.exports = handler;
