var Proposal = require('../models/proposalModel');

var ProposalsCollection = Backbone.Collection.extend({
  model: Proposal,
  url: '/api/proposals'
});

module.exports = ProposalsCollection;
