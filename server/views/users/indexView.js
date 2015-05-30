var models = require('../../models');

var handler = function (req, res) {
  models.User.findAll({
    include: [models.Skill]
  }).then(function (users) {
    res.send(users);
  });
};

module.exports = handler;
