var models = require('../models');
var _ = require('lodash');
var utils = require('../utils/utils');

var controller = {

  show: function (req, res) {
    models.Submission.findOne({
      where: { id: req.params.id},
      include: [
        {
          model: models.User
        },
        {
          model: models.Request,
          include: [models.User]
        },
        {
          model: models.Comment,
          include: [models.User]
        },
        {
          model: models.Proposal
        }
      ]
    }).then(function (submission) {
      if (_.contains([submission.UserId, submission.Request.UserId], req.user.id)) {
        res.status(200).send(submission);
      } else {
        res.status(403).send('You do not have the proper permissions to view this submission.');
      }
    });
  },

  create: function (req, res) {
    // assure that the accepted proposal belongs to the current user
    models.Request.findById(req.body.requestId).then(function (request) {
      request.getProposals({ where: { state: 1 } }).then(function (proposals) {
        var proposal = proposals[0];
        if (proposal.UserId === req.user.id) {
          models.Submission.create({
            body: req.body.body,
            link: req.body.link,
            UserId: req.user.id,
            RequestId: request.id,
            ProposalId: proposal.id
          }).then(function (submission) {
            models.Notification.create({
              UserId: request.UserId,
              SubjectUserId: req.user.id,
              actionType: 'Submission',
              actionId: submission.id,
              objectType: 'Request',
              ObjectRequestId: request.id
            });
            res.status(200).send(submission);
          });
        } else {
          res.status(403).send('You do not have permission to make a submission on this request.');
        }
      });
    });
  },

  setState: function (req, res) {
    models.Submission.find({
      where: { id: req.params.id },
      include: [models.Request, models.User, models.Proposal]
    }).then(function (submission) {
      // don't set state to the same value
      if (submission.state !== parseInt(req.body.state, 10)) {
        // ensure the submission's request belongs to the current user
        if (submission.Request.UserId === req.user.id) {
          submission.updateAttributes({ state: parseInt(req.body.state, 10) }).then(function (submission) {
            models.Notification.create({
              UserId: submission.UserId,
              SubjectUserId: req.user.id,
              actionType: { '-1': 'reject', '1': 'accept' }[req.body.state],
              objectType: 'Submission',
              ObjectSubmissionId: submission.id,
              ObjectRequestId: submission.Request.id // the request that the submission belongs to
            });
            if (submission.state === 1) { // accepted
              utils.transferPoints(req.user, submission.User, submission.Proposal.offer, models);
            }
            res.status(200).send(submission);
          });
        } else {
          res.status(403).send('you do not have the proper permissions to alter the state of this submission');
        }
      }
    });
  }

};

module.exports = controller;
