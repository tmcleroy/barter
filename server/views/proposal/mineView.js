var models = require('../../models');

var handler = function (req, res) {
  req.user.getProposals({
    include: [
      {
        model: models.Request,
        include: [models.User]
      },
      {
        model: models.Submission
      }
    ]
  }).then(function (proposals) {
    res.status(200).json(proposals);
  });
};

module.exports = handler;
