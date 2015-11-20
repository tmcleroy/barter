const _ = require('lodash');
const models = require('../models');
const Sortable = require('../helpers/sortable');

const controller = {
  show (req, res) {
    models.Request.findOne({
      where: { id: req.params.id },
      include: [
        { model: models.User },
        { model: models.Tag },
        {
          model: models.Comment,
          include: [models.User]
        },
        {
          model: models.Proposal,
          include: [models.User, models.Submission]
        },
        { model: models.Submission }
      ],
      order: [
        [ models.Comment, 'createdAt', 'ASC' ],
        [ models.Proposal, 'createdAt', 'ASC' ]
      ]
    }).then((request) => {
      res.status(200).send(request);
    });
  },

  index (req, res) {
    const sortable = new Sortable(_.extend({}, req.query, {
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
    }).then((requests) => {
      res.status(200).json({
        items: requests.rows,
        total: requests.count
      });
    });
  },

  create (req, res) {
    models.Request.create({
      UserId: req.user.id,
      title: req.body.title,
      body: req.body.body,
      offer: req.body.offer
    }).then((request) => {
      models.Tag.createTagsFromArray(req.body.tags).then((tags) => {
        const tagOrderString = req.body.tags.map((tag) => _(tags).findWhere({ dataValues: { name: tag } }).id).join(',');
        request.set('tagOrder', tagOrderString).save().then(() => {
          _.each(tags, (tag) => {
            // get the users subscribed to this tag
            tag.getUsers().then((users) => {
              _.each(users, (user) => {
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
          request.setTags(tags).then(() => {
            res.status(200).send(request);
          });
        });
      });
    });
  }

};

module.exports = controller;
