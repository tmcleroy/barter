import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip';
import 'bootstrap-sass/assets/javascripts/bootstrap/popover';

// extending views must implement the `validFormSubmitted` function
// and provide the `validations` propoerty
// see createRequestView for an example
const FormValidationView = Backbone.View.extend({

  events: {
    'submit form': 'validateForm',
    'focus [data-attr]': 'removeMessage'
  },

  // calls this.validFormSubmitted if the form passes validation
  validateForm (evt) {
    evt.preventDefault();
    let allValid = true;

    _.each(this.validations, (validation, name) => {
      let $elem = this.$(`[data-attr="${ name }"]`);
      let inputValid = validation.test($elem.val());
      if (!inputValid) {
        $elem.popover({
          title: 'Validation Error',
          content: validation.message.body,
          html: true,
          placement: validation.message.position || 'top',
          trigger: 'manual'
        }).popover('show') // show the popover
        .data('bs.popover').tip().addClass('validationError'); // add validationError class
      }
      allValid = allValid && inputValid; // allValid will be false if any of these inputs fail
    });

    if (allValid) {
      this.validFormSubmitted(evt);
    }
  },

  removeMessage (evt) {
    $(evt.target).popover('hide');
  }

});

export default FormValidationView;
