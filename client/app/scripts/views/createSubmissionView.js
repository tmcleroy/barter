var Submission = require('../models/submissionModel');
var BodyEditorView = require('./bodyEditorView');
var ConfirmationModalView = require('./confirmationModalView');

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

    new ConfirmationModalView({
      title: 'Confirm Submission',
      body: 'Are you sure your submission is complete?',
      buttons: { accept: 'Yes, Submit', cancel: 'Go Back' },
      onAccept: (evt) => {
        var body = this.$('[data-attr="body"]').val();
        var link = this.$('[data-attr="link"]').val();

        this.model.set({
          body: body,
          link: link,
          requestId: this.requestId
        });
        this.model.save();
      }
    });
  }

});

module.exports = CreateSubmissionView;
