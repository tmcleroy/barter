import template from 'templates/proposal/requestProposals.ejs';

const ProposalsView = Backbone.View.extend({
  template,
  events: {
    'click .actionContainer [data-action]': 'actionClicked'
  },

  initialize (params) {
    this.render();

    this.listenTo(this.collection, 'sync add', this.render);
  },

  render () {
    const accepted = this.collection.getAccepted();
    this.$el.html(this.template({
      allProposals: this.collection.models,
      pendingProposals: this.collection.getPending(),
      rejectedProposals: this.collection.getRejected(),
      acceptedProposal: accepted,
      submission: accepted && accepted.get('Submission')
    }));
  },

  actionClicked (evt) {
    evt.preventDefault();
    const $target = $(evt.target);
    const proposal = this.collection.get($target.closest('[data-id]').attr('data-id'));
    proposal.setState($target.attr('data-action')).done(::this.render);
  }

});

export default ProposalsView;
