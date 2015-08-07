
var ProposalsView = Backbone.View.extend({
  template: require('templates/proposal/requestProposals.ejs'),

  events: {
    'click .actionContainer [data-action]': 'actionClicked'
  },

  initialize: function (params) {
    this.render();

    this.listenTo(this.collection, 'sync add', this.render);
  },

  render: function () {
    var accepted = this.collection.getAccepted();
    this.$el.html(this.template({
      allProposals: this.collection.models,
      pendingProposals: this.collection.getPending(),
      rejectedProposals: this.collection.getRejected(),
      acceptedProposal: accepted,
      submission: accepted && accepted.get('Submission')
    }));
  },

  actionClicked: function (evt) {
    evt.preventDefault();
    var $target = $(evt.target);
    var proposal = this.collection.get($target.closest('[data-id]').attr('data-id'));
    proposal.setState($target.attr('data-action')).done(::this.render);
  }

});

export default ProposalsView;
