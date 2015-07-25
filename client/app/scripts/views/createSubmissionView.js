import Submission from '../models/submissionModel';
import BodyEditorView from './bodyEditorView';
import ConfirmationModal from './confirmationModal';
import Alert from './components/alert';

var CreateSubmissionView = Backbone.View.extend({
  template: require('../../templates/submission/createSubmission.ejs'),

  events: {
    'submit .ajaxForm': 'submitClicked'
  },

  initialize: function (params) {
    this.requestId = params.requestId;
    this.model = new Submission();
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    new BodyEditorView({
      el: this.$('.bodyEditorContainer'),
      required: true
    });
  },

  submitClicked: function (evt) {
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
            body: 'Submission Created'
          });
          App.Router.navigate('/app/proposals/mine', true);
        });
      }
    });
  }

});

export default CreateSubmissionView;
