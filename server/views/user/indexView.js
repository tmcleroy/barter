var models = require('../../models');

var handler = function (req, res) {
  models.User.findAll({
    include: [ models.Permission, models.Skill ]
  }).then(function (users) {
    res.status(200).json(users);
  });
};

module.exports = handler;
