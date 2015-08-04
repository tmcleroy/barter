var models = require('../../models');

var handler = function (req, res) {
  models.Proposal.create({
    body: req.body.body,
    offer: req.body.offer,
    RequestId: req.body.requestId,
    UserId: req.user.id
  }).then(function (proposal) {
    models.Request.findOne({ where: { id: req.body.requestId }}).then(function (request) {
      models.Notification.create({
        actionType: 'Proposal',
        actionId: proposal.id,
        objectType: 'Request',
        ObjectRequestId: request.id,
        SubjectUserId: req.user.id,
        UserId: request.UserId
      });
      res.status(200).send(proposal);
    });
  });
};

module.exports = handler;
