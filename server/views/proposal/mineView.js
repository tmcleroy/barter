var models = require('../../models');

var handler = function (req, res) {
  req.user.getProposals({
    include: [
      {
        model: models.Request,
        include: [models.User]
      }
    ]
  }).then(function (proposals) {
    res.status(200).json(proposals);
  });
};

module.exports = handler;
