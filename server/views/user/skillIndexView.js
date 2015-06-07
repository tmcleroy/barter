var models = require('../../models');

var handler = function (req, res) {
  models.User.find({
    where: { id: req.params.id },
    include: [models.Skill]
  }).then(function (user) {
    res.json(200, user.Skills);
  });
};

module.exports = handler;
