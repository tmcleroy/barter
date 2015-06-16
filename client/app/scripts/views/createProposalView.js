var Proposal = require('../models/proposalModel');

var CreateProposalView = Backbone.View.extend({
  template: require('../../templates/comment/createProposal.ejs'),

  model: null,

  events: {
    'click [data-action="submit"]': 'submitClicked'
  },

  initialize: function (params) {
    this.request = params.request;
    this.render();

    this.model = new Proposal();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submitClicked: function (evt) {
    var body = this.$('[data-attr="body"]').val();
    this.model.set({
      body: body,
      requestId: this.request.get('id')
    });
    this.model.save().done((proposal) => {
      this.collection.add(proposal);
    });
  }

});

module.exports = CreateProposalView;
