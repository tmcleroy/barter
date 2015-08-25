import FormValidationView from 'scripts/views/formValidationView';
import template from 'templates/components/searchRule.ejs';

const SearchRuleView = FormValidationView.extend({
  template,
  validations: {
    'numerical': {
      test: val => (/^\d+$/).test(val),
      message: {
        body: 'Value must be a whole number.'
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

  validFormSubmitted (evt) {
    evt.preventDefault();
    const $form = $(evt.target);
    const leftOperand = $form.find('[name="left-operand"]').val();
    const rightOperand = $form.find('[name="right-operand"]').val();
    const operator = $form.find('[name="operator"]').val();
    this.model.set({ leftOperand, rightOperand, operator });
  }
});

export default SearchRuleView;
