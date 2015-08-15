var models = require('../../models');
var Sortable = require('../../helpers/sortable');

var handler = function (req, res) {
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
        { model: models.Submission, as: 'ObjectSubmission' }
      ]
    }).then(function (notifications) {
      res.status(200).json({
        items: notifications.rows,
        total: notifications.count
      });
    });
  }
};

module.exports = handler;
