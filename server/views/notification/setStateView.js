var models = require('../../models');

var handler = function (req, res) {
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
};

module.exports = handler;
