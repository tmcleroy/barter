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
  },

  render () {
    this.$el.html(this.template({ rules: this.collection }));
    this.collection.each((rule, i) => {
      new SearchRuleView({
        el: $('<div class="ruleContainer"/>').appendTo(this.$('.rulesContainer')),
        model: rule
      });
    });
  },

  addRuleClicked (evt) {
    evt.preventDefault();
    const rule = new SearchRule();
    this.collection.add(rule);
    new SearchRuleView({
      el: $('<div class="ruleContainer"/>').appendTo(this.$('.rulesContainer')),
      model: rule
    });
  },

  clearAllClicked (evt) {
    evt.preventDefault();
    this.collection.reset();
  }
});

export default AdvancedSearchView;
