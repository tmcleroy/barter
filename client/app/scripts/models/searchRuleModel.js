// client side only model
const SearchRuleModel = Backbone.Model.extend({
  defaults: {
    rightOperandType: 'numerical'
  },

  parse (data) {
    const leftOperand = _.keys(data)[0];
    const operator = _.keys(data[leftOperand])[0];
    const rightOperand = data[leftOperand][operator];
    const rightOperandType = SearchRuleModel.operandMap[leftOperand];
    return { leftOperand, operator, rightOperand, rightOperandType };
  },
  // return object that looks like ...
  // {
  //   this.leftOperand: {
  //     this.operator: this.rightOperand
  //   }
  // }
  // this is the format expected by the server (sequelize)
  // TODO there is probably a more elegant way to do this
  getWhereQuery () {
    const json = `{
      "${ this.get('leftOperand') }": {
        "${ this.get('operator') }": "${ this.get('rightOperand') }"
      }
    }`;
    return this.get('leftOperand') && JSON.parse(json);
  }
}, {
  operandMap: {
    offer: 'numerical',
    avgProposal: 'numerical',
    tag: 'string'
  }
});

export default SearchRuleModel;
