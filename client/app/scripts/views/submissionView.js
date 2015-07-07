var Submission = require('../models/submissionModel');
var CommentsView = require('../views/commentsView');

var SubmissionView = Backbone.View.extend({
  template: require('../../templates/submission/submission.ejs'),

  views: [],
  mine: false,

  initialize: function (params) {
    this.model = new Submission({ id: params.id });


    this.model.fetch().done((Submission) => {
      this.mine = App.user.get('id') === Submission.UserId;
      this.render();
    });
  },

  render: function () {
    console.log(this.model);
    this.$el.html(this.template({
      submission: this.model
    }));
    this.views = [
      new CommentsView({
        collection: this.model.get('Comments'),
        el: this.$('.commentsContainer')
      })
    ];

    if (this.mine) {
      // mine stuff
    }
  },

  remove: function () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

module.exports = SubmissionView;
