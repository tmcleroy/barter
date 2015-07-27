var models = require('../../models');

var handler = function (req, res) {
  models.Comment.create({
    body: req.body.body
  }).then(function (comment) {
    models.Request.findOne({ where: { id: req.body.requestId }}).then(function (request) {
      comment.setRequest(request).then(function () {
        comment.setUser(req.user).then(function () {
          models.Notification.create({
            SubjectUserId: req.user.id,
            predicate: 'commented on',
            objectType: 'Request',
            objectId: request.id,
            UserId: request.UserId
          }).then(function (notification) {
            //
          });
          // need to reload to fetch associations
          // until this is implemented https://github.com/sequelize/sequelize/issues/3807
          comment.reload({ include: [models.User] }).then(function (comment) {
            res.status(200).send(comment);
          });
        });
      });
    });
  });
};

module.exports = handler;
