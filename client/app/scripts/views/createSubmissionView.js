var Submission = require('../models/submissionModel');
var BodyEditorView = require('./bodyEditorView');
var ConfirmationModal = require('./confirmationModal');
var Alert = require('./components/alert');

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
          // App.Router.navigate(`/app/requests/show/${ model.id }`, true);
          new Alert({
            type: 'success',
            body: 'Submission Created'
          });
        });
      }
    });
  }

});

module.exports = CreateSubmissionView;
