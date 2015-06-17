var models = require('../../models');

var handler = function (req, res) {
  models.Proposal.create({
    body: req.body.body,
    offer: req.body.offer
  }).then(function (proposal) {
    models.Request.findOne({ where: { id: req.body.requestId }}).then(function (request) {
      proposal.setRequest(request).then(function (proposal) {
        proposal.setUser(req.user).then(function (proposal) {
          res.status(200).send(proposal);
        });
      });
    });
  });
};

module.exports = handler;
