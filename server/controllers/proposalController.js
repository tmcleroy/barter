var models = require('../models');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Sortable = require('../helpers/sortable');

var controller = {

  index: function (req, res) {
    var sortable = new Sortable(req.query);
    models.Proposal.findAndCountAll({
      where: { UserId: req.user.id }, // never expose other users proposals
      include: [
        {
          model: models.Request,
          include: [models.User]
        },
        {
          model: models.Submission
        }
      ],
      order: sortable.querySort,
      limit: sortable.limit,
      offset: sortable.cursor
    }).then(function (proposals) {
      res.status(200).json({
        items: proposals.rows,
        total: proposals.count
      });
    });
  },

  create: function (req, res) {
    models.Proposal.create({
      body: req.body.body,
      offer: req.body.offer,
      RequestId: req.body.requestId,
      UserId: req.user.id
    }).then(function (proposal) {
      models.Request.findOne({ where: { id: req.body.requestId }}).then(function (request) {
        models.Notification.create({
          UserId: request.UserId,
          SubjectUserId: req.user.id,
          actionType: 'Proposal',
          actionId: proposal.id,
          objectType: 'Request',
          ObjectRequestId: request.id
        });
        request.set('avgProposal');
        res.status(200).send(proposal);
      });
    });
  },

  update: function (req, res) {
    models.Proposal.findById(req.params.id).then(function (proposal) {
      proposal.updateAttributes(req.body).then(function (proposal) {
        res.status(200).send(proposal);
      });
    });
  },

  setState: function (req, res) {
    models.Proposal.findById(req.params.id).then(function (proposal) {
      // ensure the proposal's request belongs to the current user
      proposal.getRequest().then(function (request) {
        if (request.UserId === req.user.id) {
          proposal.updateAttributes({ state: req.body.state }).then(function (proposal) {
            models.Notification.create({
              UserId: proposal.UserId,
              SubjectUserId: req.user.id,
              actionType: { '-1': 'reject', '1': 'accept' }[req.body.state],
              objectType: 'Proposal',
              ObjectProposalId: proposal.id,
              ObjectRequestId: request.id // the request that the proposal belongs to
            });
            // reject all the other proposals if this one is being accepted
            if (parseInt(req.body.state, 10) === 1) {
              request.getProposals({ where: { state: { ne: 1 } } }).then(function (proposals) {
                var promises = [];
                _.each(proposals, function (proposal) {
                  promises.push(proposal.updateAttributes({ state: -1 }));
                  models.Notification.create({
                    UserId: proposal.UserId,
                    SubjectUserId: req.user.id,
                    actionType: 'reject',
                    objectType: 'Proposal',
                    ObjectProposalId: proposal.id,
                    ObjectRequestId: request.id // the request that the proposal belongs to
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
  }

};

module.exports = controller;
