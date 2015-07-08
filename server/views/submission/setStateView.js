var models = require('../../models');

var handler = function (req, res) {
  models.Submission.findById(req.params.id).then(function (submission) {
    // ensure the submission's request belongs to the current user
    submission.getRequest().then(function (request) {
      if (request.UserId === req.user.id) {
        submission.updateAttributes({ state: req.body.state }).then(function (submission) {
          res.status(200).send(submission);
        });
      } else {
        res.status(401).send('you do not have the proper permissions to alter the state of this submission');
      }
    });
  });
};

module.exports = handler;
