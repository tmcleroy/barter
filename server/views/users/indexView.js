var models = require('../../models');

var handler = function (req, res) {
  models.User.findAll({
    include: [ models.Skill, models.Permission ]
  }).then(function (users) {
    res.send(users);
  });
};

module.exports = handler;
