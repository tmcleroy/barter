const models = require('../models');
const Sortable = require('../helpers/sortable');

const controller = {

  index (req, res) {
    const sortable = new Sortable(req.query);
    if (req.query.countOnly) { // only get the number of notifications
      models.Notification.count({
        where: { UserId: req.user.id }
      }).then((count) => {
        res.status(200).json(count);
      });
    } else { // get the actual notifications
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
      }).then((notifications) => {
        res.status(200).json({
          items: notifications.rows,
          total: notifications.count
        });
      });
    }
  },

  setState (req, res) {
    models.Notification.findById(req.params.id).then((notification) => {
      // ensure the notification belongs to the current user
      if (notification.UserId === req.user.id) {
        notification.updateAttributes({ state: req.body.state }).then((notification) => {
          res.status(200).send(notification);
        });
      } else {
        res.status(403).send('you do not have the proper permissions to alter the state of this notification');
      }
    });
  },

  setAllState (req, res) {
    models.Notification.update({
      state: req.body.state
    }, {
      where: { UserId: req.user.id },
      returning: false // NOTE: postgres only. only return number of rows affected
    }).then((numRowsAffected) => {
      res.status(200).send({ numRowsAffected });
    });
  }

};

module.exports = controller;
