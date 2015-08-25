import SearchRule from 'scripts/models/searchRuleModel';

// client side only collection
const SearchRuleCollection = Backbone.Collection.extend({
  model: SearchRule,

  getWhereQuery () {
    let queries = {};
    this.each((rule) => {
      _.extend(queries, rule.getWhereQuery());
    });
    return { where: queries };
  }
});

export default SearchRuleCollection;
