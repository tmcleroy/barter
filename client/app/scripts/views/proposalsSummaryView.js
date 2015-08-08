
const ProposalsSummaryView = Backbone.View.extend({
  template: require('templates/proposal/proposalsSummary.ejs'),

  events: {
  },

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
