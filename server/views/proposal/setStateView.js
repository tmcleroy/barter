var _ = require('lodash');
var models = require('../../models');
var Sequelize = require('sequelize');

var handler = function (req, res) {
  models.Proposal.findById(req.params.id).then(function (proposal) {
    // ensure the proposal's request belongs to the current user
    proposal.getRequest().then(function (request) {
      if (request.UserId === req.user.id) {
        proposal.updateAttributes({ state: req.body.state }).then(function (proposal) {
          models.Notification.create({
            actionType: { '-1': 'reject', '1': 'accept' }[req.body.state],
            objectType: 'Proposal',
            ObjectProposalId: proposal.id,
            ObjectRequestId: request.id, // the request that the proposal belongs to
            SubjectUserId: req.user.id,
            UserId: proposal.UserId
          });
          // reject all the other proposals if this one is being accepted
          if (parseInt(req.body.state, 10) === 1) {
            request.getProposals({ where: { state: { ne: 1 } } }).then(function (proposals) {
              var promises = [];
              _.each(proposals, function (proposal) {
                promises.push(proposal.updateAttributes({ state: -1 }));
                models.Notification.create({
                  actionType: 'reject',
                  objectType: 'Proposal',
                  ObjectProposalId: proposal.id,
                  ObjectRequestId: request.id, // the request that the proposal belongs to
                  SubjectUserId: req.user.id,
                  UserId: proposal.UserId
                });
              });
              Sequelize.Promise.all(promises).then(function () {
                res.status(200).send(proposal);
              });
            });
          } else {
            res.status(200).send(proposal);
          }
        });
      } else {
        res.status(401).send('you do not have the proper permissions to alter the state of this request');
      }
    });
  });
};

module.exports = handler;
