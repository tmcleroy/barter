var _ = require('lodash');
var models = require('../../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.user.id }
  }).then(function (user) {
    // create tags if they don't exist, and get their ids
    models.Tag.createTagsFromArray(req.body.tags).then(function (tags) {
      user.setTags(tags).then(function () {
        res.status(200).send(user);
      });
      _.each(tags, function (tag) {
        tag.addUser(user);
      });
    });
  });
};

module.exports = handler;
