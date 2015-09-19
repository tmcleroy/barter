import SearchRule from 'scripts/models/searchRuleModel';

// client side only collection
const SearchRuleCollection = Backbone.Collection.extend({
  model: SearchRule,

  getWhereQuery () {
    let queries = [];
    this.each((rule) => {
      const ruleQuery = rule.getWhereQuery();
      if (ruleQuery) { queries.push(ruleQuery); }
    });
    return this.length ? { where: { $and: queries } } : null;
  },

  getNumActive () {
    return _.filter(this.models, model => !!model.get('rightOperand')).length;
  }
});

export default SearchRuleCollection;
