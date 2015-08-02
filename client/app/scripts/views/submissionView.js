var Submission = require('../models/submissionModel');
var CommentsView = require('../views/commentsView');
var ConfirmationModal = require('./confirmationModal');
var Alert = require('./components/alert');

var SubmissionView = Backbone.View.extend({
  template: require('../../templates/submission/submission.ejs'),

  events: {
    'click [data-action^="state-"]': 'stateClicked'
  },

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
    this.$el.html(this.template({
      submission: this.model,
      state: this.model.getStateString(),
      stateFormatted: this.model.getStateStringFormatted()
    }));
    // this.views = [
    //   new CommentsView({
    //     collection: this.model.get('Comments'),
    //     el: this.$('.commentsContainer')
    //   })
    // ];

    if (this.mine) {
      // mine stuff
    }
  },

  stateClicked (evt) {
    var state = $(evt.target).attr('data-action').split(/state-/)[1];

    new ConfirmationModal({
      title: 'Confirm Action',
      body: `Are you sure you want to ${ state.slice(0, -2) } this submission`,
      buttons: { accept: `Yes, ${ state.slice(0, -2) }`, cancel: 'Go Back' },
      onAccept: (evt) => {
        $('body').addClass('loading');
        this.model.setState(state).done((model) => {
          $('body').removeClass('loading');
          new Alert({
            type: { accepted: 'success', rejected: 'info' }[state],
            body: `Submission ${ state }`
          });
          App.Router.navigate('/app/requests/mine', true);
        });
      }
    });
  },

  remove: function () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

module.exports = SubmissionView;
