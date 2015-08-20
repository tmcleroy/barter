var _ = require('lodash');
var Sequelize = require('sequelize');
var models = require('../../../models');

var handler = function (req, res) {
  models.User.findOne({
    where: { id: req.user.id }
  }).then(function (user) {
    // create tags if they don't exist, and get their ids
    createTags(function (tags) {
      user.setTags(tags).then(function () {
        res.status(200).send(user);
      });
      _.each(tags, function (tag) {
        tag.addUser(user);
      });
    });
  });

  // TODO abstract this into utils for now
  // this exact function is duplicated in requests/createView
  function createTags (cb) {
    var promises = [];
    var tags = {};
    _.each(req.body.tags, function (tag) {
      tags[tag] = null;
      var promise = models.Tag.findOrCreate({ where: { name: tag }})
        .then(function (resultTags, created) {
          tags[tag] = resultTags[0];
        });
      promises.push(promise);
    });
    Sequelize.Promise.all(promises).then(function () {
      cb(_.values(tags));
    });
  }
};

module.exports = handler;
