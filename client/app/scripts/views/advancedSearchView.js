import SearchRule from 'scripts/models/searchRuleModel';
import SearchRuleView from 'scripts/views/searchRuleView';
import template from 'templates/components/advancedSearch.ejs';

const AdvancedSearchView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="add-rule"]': 'addRuleClicked'
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template());
    this.collection.each((rule) => {
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
      el: $('<div class="rule"/>').appendTo(this.$('.rulesContainer')),
      model: rule
    });
  }
});

export default AdvancedSearchView;
