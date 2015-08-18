var models = require('../../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.user.id },
    include : [
      { model: models.Tag }
    ]
  }).then(function (user) {
    res.status(200).send(user.Tags || null);
  });
};

module.exports = handler;
