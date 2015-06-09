var models = require('../../models');

var handler = function (req, res) {
  models.User.find({
    where: { id: req.params.id },
    include: [models.Skill]
  }).then(function (user) {
    res.status(200).json(user.Skills);
  });
};

module.exports = handler;
