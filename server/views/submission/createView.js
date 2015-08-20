var models = require('../../models');

var handler = function (req, res) {
  // assure that the accepted proposal belongs to the current user
  models.Request.findById(req.body.requestId).then(function (request) {
    request.getProposals({ where: { state: 1 } }).then(function (proposals) {
      var proposal = proposals[0];
      if (proposal.UserId === req.user.id) {
        models.Submission.create({
          body: req.body.body,
          link: req.body.link,
          UserId: req.user.id,
          RequestId: request.id,
          ProposalId: proposal.id
        }).then(function (submission) {
          models.Notification.create({
            UserId: request.UserId,
            SubjectUserId: req.user.id,
            actionType: 'Submission',
            actionId: submission.id,
            objectType: 'Request',
            ObjectRequestId: request.id
          });
          res.status(200).send(submission);
        });
      } else {
        res.status(401).send('You do not have permission to make a submission on this request.');
      }
    });
  });
};

module.exports = handler;
