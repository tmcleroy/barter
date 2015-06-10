var models = require('../../models');

var handler = function (req, res) {
  models.Request.findOne({
    where: { id: req.params.id},
    include: [models.User, models.Tag, models.Comment, models.Proposal]
  }).then(function (request) {
    res.status(200).json(request);
  });
};

module.exports = handler;
