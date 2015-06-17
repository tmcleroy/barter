var Proposal = require('../models/proposalModel');

var ProposalsCollection = Backbone.Collection.extend({
  model: Proposal,

  url: '/api/proposals',

  getAvgOffer: function () {
    var sum = this.reduce((memo, value) => {
      return memo + (value.get('offer') || 0);
    }, 0);
    return Math.round(sum / this.length);
  }
});

module.exports = ProposalsCollection;
