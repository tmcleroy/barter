var models = require('../../models');

var handler = function (req, res) {
  models.Proposal.create({
    body: req.body.body
  }).then(function (proposal) {
    proposal.setUser(req.user);
    models.Request.findOne({ where: { id: req.body.requestId }})
      .then(function (request) {
        proposal.setRequest(request);
        res.status(200).send(proposal);
      });
  });
};

module.exports = handler;
