var models = require('../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.params.id},
    attributes: ['id', 'username', 'email', 'rep', 'avatar'],
    include: [ models.Skill, models.Permission ]
  }).then(function (user) {
    res.status(200).send(user.toJSON());
  });
};

module.exports = handler;
