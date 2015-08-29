import template from 'templates/proposal/proposalsSummary.ejs';

const ProposalsSummaryView = Backbone.View.extend({
  template,
  initialize (params) {
    this.render();

    this.listenTo(this.collection, 'sync change add', this.render);
  },

  render () {
    this.$el.html(this.template({
      proposals: this.collection
    }));
  }

});

export default ProposalsSummaryView;
