var models = require('../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.params.id},
    attributes: ['id', 'username', 'email'],
    include: [ models.Skill, models.Permission ]
  }).then(function (user) {
    res.json(200, user.toClientJSON());
  });
};

module.exports = handler;
