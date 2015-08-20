var _ = require('lodash');
var Sequelize = require('sequelize');
var models = require('../../models');

var handler = function (req, res) {
  models.Request.create({
    UserId: req.user.id,
    title: req.body.title,
    body: req.body.body,
    offer: req.body.offer
  }).then(function (request) {
    createTags(function (tags) {
      request.setTags(tags).then(function () {
        res.status(200).send(request);
      });
      _.each(tags, function (tag) {
        // get the users subscribed to this tag
        tag.getUsers().then(function (users) {
          _.each(users, function (user) {
            models.Notification.create({
              UserId: user.id,
              SubjectUserId: req.user.id,
              actionType: 'request-with-tag',
              actionId: request.id,
              objectType: 'Tag',
              // NOTE two objects are being set here, this is exceptional
              ObjectTagId: tag.id, // first object is the tag so we can get its name
              ObjectRequestId: request.id // second object is the request so we can link to it
            });
          });
        });
      });
    });
  });

  // TODO abstract this into utils for now
  // this exact function is duplicated in user/subscriptions/setView
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
