var models = require('../models');

var handler = function (req, res) {
  models.User.findOne({ where: { username: req.body.username } })
    .then(function (user) {
      if (!user) { // user doesn't exist, attempt to create it
        models.User.create({
          username: req.body.username,
          password: req.body.password, // password hashing is handled in the model setter
          email: req.body.email
        }).then(function (user) {
          res.status(200).send(user);
        });
      } else { // user already exists
        res.status(500).send('user already exists');
      }
    });
};

module.exports = handler;
