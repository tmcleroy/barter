var _ = require('lodash');
var models = require('../../models');

var handler = function (req, res) {
  models.Request.create({
    UserId: req.user.id,
    title: req.body.title,
    body: req.body.body,
    offer: req.body.offer
  }).then(function (request) {
    models.Tag.createTagsFromArray(req.body.tags).then(function (tags) {
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
};


module.exports = handler;
