import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip';
import 'bootstrap-sass/assets/javascripts/bootstrap/popover';

const FormValidationView = Backbone.View.extend({

  // expect validations to be supplied by the child view
  // see createRequestView for an example
  // validations: {
  //   'title': { // the [data-attr] value for the input
  //     test: val => val.length > 10,
  //     message: {
  //       body: 'Title must be at least 10 characters.',
  //       position: 'bottom' // default is 'top'
  //     }
  //   }
  // },

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
