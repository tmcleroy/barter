import FormValidationView from 'scripts/views/formValidationView';
import SearchRuleModel from 'scripts/models/searchRuleModel.js';
import template from 'templates/components/searchRule.ejs';

const SearchRuleView = FormValidationView.extend({
  template,
  events: _.extend({}, FormValidationView.prototype.events, {
    'click [data-action="close"]': 'closeClicked',
    'change select[name="left-operand"]': 'leftOperandSelected'
  }),

  validations: {
    numerical: {
      test: val => (/^\d+$/).test(val), // digits only
      message: {
        body: 'Value must be a whole number.'
      }
    },
    string: {
      test: val => (/^\w+$/).test(val), // word characters only
      message: {
        body: 'Value must be text.'
      }
    }
  },

  initialize (params) {
    this.render();
  },

  render () {
    this.$el.html(this.template({
      rule: this.model,
      active: this.model.get('rightOperand')
    }));
  },

  // this method is typically used to restrict right operand selection options based on the chosen left operand
  // for example, if the left operand is 'tag', you only want to allow the 'equals' right operand
  leftOperandSelected (evt) {
    const leftOperand = $(evt.target).val();
    const restriction = {
      tag: () => {
        this.$('[name="operator"] :not(option[value="$eq"])').remove();
        this.$('[name="right-operand"]').attr('data-attr', SearchRuleModel.operandMap[leftOperand]);
      }
    }[leftOperand];
    if (restriction) {
      restriction();
    }
  },

  validFormSubmitted (evt) {
    evt.preventDefault();
    const $form = $(evt.target);
    const leftOperand = $form.find('[name="left-operand"]').val();
    const rightOperand = $form.find('[name="right-operand"]').val();
    const operator = $form.find('[name="operator"]').val();
    this.model.set({ leftOperand, rightOperand, operator });
  },

  closeClicked (evt) {
    this.model.collection.remove(this.model);
  }
});

export default SearchRuleView;
