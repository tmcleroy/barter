// client side only model
const SearchRuleModel = Backbone.Model.extend({
  // return object that looks like ...
  // {
  //   this.leftOperand: {
  //     this.operator: this.rightOperand
  //   }
  // }
  // this is the format the server (sequelize) expects
  getWhereQuery () {
    const json = `{
      "${ this.get('leftOperand') }": {
        "$${ this.get('operator') }": ${ this.get('rightOperand') }
      }
    }`;
    return JSON.parse(json);
  }
});

export default SearchRuleModel;
