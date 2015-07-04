var Submission = require('../models/submissionModel');
var BodyEditorView = require('./_bodyEditorView');

var CreateSubmissionView = BodyEditorView.extend({
  template: require('../../templates/submission/createSubmission.ejs'),

  events: {
    'click [data-action="submit"]': 'submitClicked'
  },

  initialize: function (params) {
    this.requestId = params.requestId;
    this.model = new Submission();
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  },

  submitClicked: function (evt) {
    evt.preventDefault();
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

module.exports = CreateSubmissionView;
