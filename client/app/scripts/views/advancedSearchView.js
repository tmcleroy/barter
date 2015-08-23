import SearchRule from 'scripts/models/searchRuleModel';
import SearchRules from 'scripts/collections/searchRuleCollection';
import SearchRuleView from 'scripts/views/searchRuleView';
import template from 'templates/components/advancedSearch.ejs';

const AdvancedSearchView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="add-rule"]': 'addRuleClicked'
  },

  collection: new SearchRules(),

  initialize (params) {
    this.render();
    this.listenTo(this.collection, 'change', this.rulesChanged);
  },

  render () {
    this.$el.html(this.template());
  },

  addRuleClicked (evt) {
    evt.preventDefault();
    const rule = new SearchRule();
    this.collection.add(rule);
    new SearchRuleView({
      el: $('<div class="rule"/>').appendTo(this.$('.rulesContainer')),
      model: rule
    });
  },

  rulesChanged () {
    console.log(this.collection.getWhereQuery());
    // this.collection.each((model) => {
    //   console.log(model.getWhereQuery());
    // });
  }
});

export default AdvancedSearchView;
