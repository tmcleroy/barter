import Proposal from 'scripts/models/proposalModel';
import PaginatedCollection from './_paginatedCollection';

const ProposalsCollection = PaginatedCollection.extend({
  model: Proposal,

  url: '/api/proposals',

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

export default ProposalsCollection;
