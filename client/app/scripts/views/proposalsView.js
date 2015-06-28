
var ProposalsView = Backbone.View.extend({
  template: require('../../templates/proposal/proposals.ejs'),

  events: {
    'click .actionContainer [data-action]': 'actionClicked'
  },

  initialize: function (params) {
    this.render();

    this.listenTo(this.collection, 'sync add', this.render);
  },

  render: function () {
    this.$el.html(this.template({
      allProposals: this.collection.models,
      pendingProposals: this.collection.getPending(),
      rejectedProposals: this.collection.getRejected(),
      acceptedProposal: this.collection.getAccepted()
    }));
  },

  actionClicked: function (evt) {
    evt.preventDefault();
    var $target = $(evt.target);
    var proposal = this.collection.get($target.closest('[data-id]').attr('data-id'));
    proposal.setState($target.attr('data-action'));
    proposal.save();
  }

});

module.exports = ProposalsView;
