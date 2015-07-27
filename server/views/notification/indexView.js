var models = require('../../models');

var handler = function (req, res) {
  models.Notification.findAll({
    where: { UserId: req.user.id },
    include: [
      { model: models.User },
      { model: models.User, as: 'SubjectUser' }
    ]
  }).then(function (notifications) {
    res.status(200).json(notifications);
  });
};

module.exports = handler;
