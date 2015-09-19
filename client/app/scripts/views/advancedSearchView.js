import SearchRule from 'scripts/models/searchRuleModel';
import SearchRuleView from 'scripts/views/searchRuleView';
import template from 'templates/components/advancedSearch.ejs';

const AdvancedSearchView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="add-rule"]': 'addRuleClicked',
    'click [data-action="clear-all"]': 'clearAllClicked'
  },

  initialize (params) {
    this.render();
    this.listenTo(this.collection, 'add reset', this.render);
  },

  render () {
    this.$el.html(this.template({
      rules: this.collection,
      numActive: this.collection.getNumActive()
    }));
    this.collection.each((rule, i) => {
      new SearchRuleView({
        el: $('<div class="ruleContainer"/>').appendTo(this.$('.rulesContainer')),
        model: rule
      });
    });
  },

  addRuleClicked (evt) {
    evt.preventDefault();
    this.collection.add(new SearchRule());
  },

  clearAllClicked (evt) {
    evt.preventDefault();
    this.collection.reset();
  }
});

export default AdvancedSearchView;
