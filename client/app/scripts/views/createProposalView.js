var Proposal = require('../models/proposalModel');
var ConfirmationModal = require('./confirmationModal');
var Alert = require('./components/alert');

var CreateProposalView = Backbone.View.extend({
  template: require('../../templates/comment/createProposal.ejs'),

  events: {
    'submit .ajaxForm': 'submitClicked'
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

    new ConfirmationModal({
      title: 'Confirm Proposal',
      body: 'By submitting this proposal, you are committing to fulfill this request in exchange for <span class="offer">' + this.$('[data-attr="offer"]').val() + 'ę</span>',
      onAccept: (evt) => {
        var body = this.$('[data-attr="body"]').val();
        var offer = this.$('[data-attr="offer"]').val();

        this.model.set({
          body: body,
          offer: offer,
          requestId: this.request.get('id')
        });
        this.model.save().done((proposal) => {
          this.collection.add(proposal);
          this.render();
          new Alert({
            type: 'success',
            body: 'Proposal Submitted',
            delay: 10
          });
        });
      }
    });
  }

});

module.exports = CreateProposalView;
