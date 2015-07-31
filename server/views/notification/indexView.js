var _ = require('lodash');
var models = require('../../models');

var whereMap = {
  seen: { seen: true },
  unseen: { seen: false }
};

var handler = function (req, res) {
  var where = _.extend({}, whereMap[req.query.where], { UserId: req.user.id });
  if (req.query.countOnly) {
    models.Notification.count({
      where: where
    }).then(function (count) {
      res.status(200).json(count);
    });
  } else {
    models.Notification.findAll({
      where: where,
      include: [
        { model: models.User, as: 'User' },
        { model: models.User, as: 'SubjectUser' },
        { model: models.User, as: 'ObjectUser' },
        { model: models.Comment, as: 'ObjectComment' },
        { model: models.Proposal, as: 'ObjectProposal' },
        { model: models.Request, as: 'ObjectRequest' },
        { model: models.Submission, as: 'ObjectSubmission' }
      ]
    }).then(function (notifications) {
      res.status(200).json(notifications);
    });
  }
};

module.exports = handler;
