var models = require('../../models');

var handler = function (req, res) {
  models.Proposal.findById(req.params.id).then(function (proposal) {
    proposal.updateAttributes(req.body).then(function (proposal) {
      res.status(200).send(proposal);
    });
  });
};

module.exports = handler;
