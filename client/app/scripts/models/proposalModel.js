var ProposalModel = Backbone.Model.extend({

  stateMap: {
    '-1': 'rejected',
    '0': 'pending',
    '1': 'accepted'
  },

  stateStringMap: {
    rejected: -1,
    pending: 0,
    accepted: 1
  },

  urlRoot: '/api/proposals',

  setState: function (state) {
    this.set('state', this.stateStringMap[state]);
    return $.ajax({
      url: '/api/proposals/' + this.get('id') + '/state',
      method: 'POST',
      data: {
        state: this.get('state')
      }
    });
  },

  getStateString: function () {
    return this.stateMap[this.get('state') + ''];
  },

  getStateStringFormatted: function () {
    var stateString = this.getStateString();
    return stateString.replace(/^\w/, stateString.charAt(0).toUpperCase());
  }

});

module.exports = ProposalModel;
