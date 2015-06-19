var models = require('../../models');

var handler = function (req, res) {
  req.user.getRequests({
    include: [models.User, models.Tag, models.Comment, models.Proposal]
  }).then(function (requests) {
    res.status(200).json(requests);
  });
};

module.exports = handler;
