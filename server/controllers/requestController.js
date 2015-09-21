var _ = require('lodash');
var models = require('../models');
var Sortable = require('../helpers/sortable');

var controller = {

  show: function (req, res) {
    models.Request.findOne({
      where: { id: req.params.id},
      include: [
        {
          model: models.User
        },
        {
          model: models.Tag
        },
        {
          model: models.Comment,
          include: [models.User]
        },
        {
          model: models.Proposal,
          include: [models.User, models.Submission]
        },
        {
          model: models.Submission
        }
      ]
    }).then(function (request) {
      res.status(200).send(request);
    });
  },

  index: function (req, res) {
    var sortable = new Sortable(_.extend({}, req.query, {
      sorts: {
        default: 'createdAt',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        title: 'title',
        offer: 'offer',
        avgProposal: 'avgProposal'
      }
    }));
    models.Request.findAndCountAll({
      where: _.extend({}, req.query.where, (req.query.mine ? { UserId: req.user.id } : {})),
      include: [
        { model: models.User },
        { model: models.Tag },
        { model: models.Proposal }
      ],
      order: sortable.querySort,
      limit: sortable.limit,
      offset: sortable.cursor
    }).then(function (requests) {
      res.status(200).json({
        items: requests.rows,
        total: requests.count
      });
    });
  },

  create: function (req, res) {
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
  }

};

module.exports = controller;
