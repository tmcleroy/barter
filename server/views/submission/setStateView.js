var models = require('../../models');
var utils = require('../../utils/utils');

var handler = function (req, res) {
  models.Submission.find({
    where: { id: req.params.id },
    include: [models.Request, models.User, models.Proposal]
  }).then(function (submission) {
    // don't set state to the same value
    if (submission.state !== parseInt(req.body.state, 10)) {
      // ensure the submission's request belongs to the current user
      if (submission.Request.UserId === req.user.id) {
        submission.updateAttributes({ state: parseInt(req.body.state, 10) }).then(function (submission) {
          if (submission.state === 1) { // accepted
            utils.transferPoints(req.user, submission.User, submission.Proposal.offer);
          }
          res.status(200).send(submission);
        });
      } else {
        res.status(401).send('you do not have the proper permissions to alter the state of this submission');
      }
    }
  });
};

module.exports = handler;
