import template from 'templates/components/advancedSearch.ejs';

const AdvancedSearchView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="apply"]': 'applyClicked'
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
  },

  applyClicked (evt) {
    evt.preventDefault();
    const query = this.$('[data-attr="advanced-query"]').val();
    console.log(query);
  }
});

export default AdvancedSearchView;
