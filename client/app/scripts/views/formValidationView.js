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
      const $input = this.$(`[data-attr="${name}"]`);
      // input is valid if it doesn't exist
      const inputValid = $input.length ? validation.test($input.val()) : true;

      if (!inputValid) { // validation error
        let $msgElem = this.getMsgElem($input);
        $msgElem.popover({
          title: 'Validation Error',
          content: validation.message.body,
          html: true,
          placement: validation.message.position || 'top',
          trigger: 'manual'
        }).popover('show')
        .data('bs.popover').tip().addClass('validationError'); // add validationError class
      }
      allValid = allValid && inputValid; // allValid will be false if any of the inputs fail
    });

    if (allValid) {
      this.validFormSubmitted(evt);
    }
  },

  // returns the closest `[data-anchor="validation"]` element if available (see bodyEditor.ejs)
  // otherwise, returns the form input element itself
  getMsgElem ($input) {
    const $anchor = $input.closest('[data-anchor="validation"]');
    return $anchor.length ? $anchor : $input;
  },

  removeMessage (evt) {
    let $msgElem = this.getMsgElem($(evt.target));
    $msgElem.popover('hide');
  }

});

export default FormValidationView;
