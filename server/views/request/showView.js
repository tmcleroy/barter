var models = require('../../models');

var handler = function (req, res) {
  models.Request.findOne({
    where: { id: req.params.id},
    include: [
      {
        model: models.User
      },
      {
        model: models.Tag
      },
      {
        model: models.Comment,
        include: [models.User]
      },
      {
        model: models.Proposal,
        include: [models.User]
      }
    ]
  }).then(function (request) {
    res.status(200).json(request);
  });
};

module.exports = handler;
