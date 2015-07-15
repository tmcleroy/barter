var Proposal = require('../models/proposalModel');
var ModalView = require('./modalView');

var CreateProposalView = Backbone.View.extend({
  template: require('../../templates/comment/createProposal.ejs'),

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
    evt.preventDefault();
    new ModalView({});
    // var body = this.$('[data-attr="body"]').val();
    // var offer = this.$('[data-attr="offer"]').val();
    //
    // this.model.set({
    //   body: body,
    //   offer: offer,
    //   requestId: this.request.get('id')
    // });
    // this.model.save().done((proposal) => {
    //   this.collection.add(proposal);
    // });
  }

});

module.exports = CreateProposalView;
