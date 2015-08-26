import SearchRule from 'scripts/models/searchRuleModel';

// client side only collection
const SearchRuleCollection = Backbone.Collection.extend({
  model: SearchRule,

  getWhereQuery () {
    let queries = [];
    this.each((rule) => {
      console.log('rule is', rule);
      queries.push(rule.getWhereQuery());
    });
    return { where: { $and: queries } };
  }
});

export default SearchRuleCollection;
