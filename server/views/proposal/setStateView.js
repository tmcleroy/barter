var models = require('../../models');

var handler = function (req, res) {
  models.Proposal.findById(req.params.id).then(function (proposal) {
    // ensure the proposal's request belongs to the current user
    proposal.getRequest().then(function (request) {
      if (request.UserId == req.user.id) {
        proposal.updateAttributes({ state: req.body.state }).then(function (proposal) {
          res.status(200).send(proposal);
        });
      } else {
        res.status(401).send('you do not have the proper permissions to alter the state of this request');
      }
    });
  });
};

module.exports = handler;
