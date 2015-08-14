import Submission from 'scripts/models/submissionModel';
import BodyEditorView from 'scripts/views/bodyEditorView';
import FormValidationView from 'scripts/views/formValidationView';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';
import template from 'templates/submission/createSubmission.ejs';

const CreateSubmissionView = FormValidationView.extend({
  template,
  validations: {
    'body': {
      test: val => val.length > 20,
      message: {
        body: 'Submission must be at least 20 characters.'
      }
    }
  },

  initialize (params) {
    this.requestId = params.requestId;
    this.model = new Submission();
    this.render();
  },

  render () {
    this.$el.html(this.template());
    new BodyEditorView({
      el: this.$('.bodyEditorContainer'),
      required: true
    });
  },

  validFormSubmitted (evt) {
    evt.preventDefault();

    new ConfirmationModal({
      title: 'Confirm Submission',
      body: 'Are you sure your submission is complete?',
      buttons: { accept: 'Yes, Submit', cancel: 'Go Back' },
      onAccept: (evt) => {
        $('body').addClass('loading');
        var body = this.$('[data-attr="body"]').val();
        var link = this.$('[data-attr="link"]').val();

        this.model.set({
          body: body,
          link: link,
          requestId: this.requestId
        });
        this.model.save().done((model) => {
          $('body').removeClass('loading');
          new Alert({
            type: 'success',
            body: 'Submission created'
          });
          App.Router.navigate('/app/proposals/mine', true);
        });
      }
    });
  }

});

export default CreateSubmissionView;
