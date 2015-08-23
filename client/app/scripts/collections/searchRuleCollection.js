import SearchRule from 'scripts/models/searchRuleModel';

// client side only collection
const SearchRuleCollection = Backbone.Collection.extend({
  model: SearchRule,

  getWhereQuery () {
    let query = {};
    this.each((rule) => {
      _.extend(query, rule.getWhereQuery());
    });
    return query;
  }
});

export default SearchRuleCollection;
