var models = require('../models');
var Sortable = require('../helpers/sortable');

var controller = {

  index: function (req, res) {
    var sortable = new Sortable(req.query);
    if (req.query.countOnly) {
      models.Notification.count({
        where: { UserId: req.user.id }
      }).then(function (count) {
        res.status(200).json(count);
      });
    } else {
      models.Notification.findAndCountAll({
        where: { UserId: req.user.id },
        order: [['"createdAt"', 'desc']],
        limit: sortable.limit,
        offset: sortable.cursor,
        include: [
          { model: models.User, as: 'User' },
          { model: models.User, as: 'SubjectUser' },
          { model: models.User, as: 'ObjectUser' },
          { model: models.Comment, as: 'ObjectComment' },
          { model: models.Proposal, as: 'ObjectProposal' },
          { model: models.Request, as: 'ObjectRequest' },
          { model: models.Submission, as: 'ObjectSubmission' },
          { model: models.Tag, as: 'ObjectTag' }
        ]
      }).then(function (notifications) {
        res.status(200).json({
          items: notifications.rows,
          total: notifications.count
        });
      });
    }
  },

  setState: function (req, res) {
    models.Notification.findById(req.params.id).then(function (notification) {
      // ensure the notification belongs to the current user
      if (notification.UserId === req.user.id) {
        notification.updateAttributes({ state: req.body.state }).then(function (notification) {
          res.status(200).send(notification);
        });
      } else {
        res.status(401).send('you do not have the proper permissions to alter the state of this notification');
      }
    });
  },

  setAllState: function (req, res) {
    models.Notification.update({
      state: req.body.state
    }, {
      where: { UserId: req.user.id },
      returning: false // NOTE: postgres only. only return number of rown affected
    }).then(function (numRowsAffected) {
      res.status(200).send({ numRowsAffected: numRowsAffected });
    });
  }

};

module.exports = controller;
