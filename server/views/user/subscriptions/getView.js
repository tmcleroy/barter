
var models = require('../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.params.id },
    include : [
      { model: models.Tag, as: 'SubscribedTags' }
    ]
  }).then(function (user) {
    res.status(200).send(user.SubscribedTags);
  });
};

module.exports = handler;
