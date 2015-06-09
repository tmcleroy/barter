var models = require('../../models');

var handler = function (req, res) {
  models.User.findAll({
    include: [models.Skill, models.Permission]
  }).then(function (users) {
    res.status(200).json(users);
  });
};

module.exports = handler;
