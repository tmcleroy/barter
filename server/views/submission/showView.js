var _ = require('lodash');
var models = require('../../models');

var handler = function (req, res) {
  models.Submission.findOne({
    where: { id: req.params.id},
    include: [
      {
        model: models.User
      },
      {
        model: models.Request
      },
      {
        model: models.Comment,
        include: [models.User]
      },
      {
        model: models.Proposal
      }
    ]
  }).then(function (submission) {
    if (_.contains([submission.UserId, submission.Request.UserId], req.user.id)) {
      res.status(200).send(submission);
    } else {
      res.status(401).send('You do not have the proper permissions to view this submission.');
    }
  });
};

module.exports = handler;
