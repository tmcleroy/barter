var models = require('../../models');

var handler = function (req, res) {
  models.User.find({
    where: { id: req.params.id},
    include: [ models.Skill, models.Permission ],
    limit: 1
  }).then(function (user) {
    res.send(user);
  });
};

module.exports = handler;
