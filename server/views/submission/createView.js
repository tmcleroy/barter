var models = require('../../models');
var Sequelize = require('sequelize');

var handler = function (req, res) {
  // assure that the accepted proposal belongs to the current user
  models.Request.findById(req.body.requestId).then(function (request) {
    request.getProposals({ where: { state: 1 } }).then(function (proposals) {
      var proposal = proposals[0];
      if (proposal.UserId === req.user.id) {
        models.Submission.create({
          body: req.body.body,
          link: req.body.link
        }).then(function (submission) {
          var promises = [];
          // FIXME there may be a way to bulk set these attrs
          promises.push(submission.setUser(req.user));
          promises.push(submission.setRequest(request));
          promises.push(submission.setProposal(proposal));
          Sequelize.Promise.all(promises).then(function () {
            res.status(200).send(submission);
          });
        });
      } else {
        res.status(401).send('You do not have permission to make a submission on this request.');
      }
    });
  });
};

module.exports = handler;
