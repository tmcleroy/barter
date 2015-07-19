var Proposal = require('../models/proposalModel');

var ProposalsCollection = Backbone.Collection.extend({
  model: Proposal,

  url: '/api/proposals',

  parse: function (data) {
    this.total = data.total;
    return data.items;
  },

  getAvgOffer: function () {
    var sum = this.reduce((memo, value) => {
      return memo + (value.get('offer') || 0);
    }, 0);
    return Math.round(sum / this.length);
  },

  getPending: function () {
    return this.where({ state: 0 });
  },

  getRejected: function () {
    return this.where({ state: -1 });
  },

  getAccepted: function () {
    return this.findWhere({ state: 1 });
  }
});

module.exports = ProposalsCollection;
