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

    var onAccept = _.bind(function (evt) {
      var body = this.$('[data-attr="body"]').val();
      var offer = this.$('[data-attr="offer"]').val();

      this.model.set({
        body: body,
        offer: offer,
        requestId: this.request.get('id')
      });
      this.model.save().done((proposal) => {
        this.collection.add(proposal);
      });
    }, this);

    new ModalView({
      title: 'Confirm Proposal',
      body: 'By submitting this proposal, you are committing to fulfill this request in exchange for <div class="offer">' + this.$('[data-attr="offer"]').val() + 'ę</div>',
      buttons: { accept: 'I Understand', cancel: 'Go Back' },
      dismissable: false,
      onAccept: onAccept
    });
  }

});

module.exports = CreateProposalView;
