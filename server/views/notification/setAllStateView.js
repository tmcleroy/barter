var models = require('../../models');

var handler = function (req, res) {
  models.Notification.update({
    state: req.body.state
  }, {
    where: { UserId: req.user.id },
    returning: false // NOTE: postgres only. only return number of rown affected
  }).then(function (numRowsAffected) {
    res.status(200).send({ numRowsAffected: numRowsAffected });
  });
};

module.exports = handler;
