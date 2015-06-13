var Request = require('../models/requestModel');
var CommentsView = require('../views/commentsView');
var CreateCommentView = require('../views/createCommentView');
var CreateProposalView = require('../views/createProposalView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/request/request.ejs'),

  model: null,
  views: {},

  events: {
    'click [data-action="addComment"]': 'toggleAddComment',
    'click [data-action="makeProposal"]': 'toggleMakeProposal'
  },

  initialize: function (params) {
    this.model = new Request({ id: params.id });

    this.model.fetch().done(_.bind(this.requestLoaded, this));
  },

  render: function () {
    this.$el.html(this.template({
      model: this.model
    }));
  },

  requestLoaded: function () {
    this.render();
    this.listenTo(this.model, 'change', this.render);
    new CommentsView({
      collection: this.model.get('Comments'),
      el: this.$('.commentsContainer')
    });
  },

  toggleAddComment: function (evt) {
    var $target = $(evt.target);

    this.$('.createCommentContainer').toggleClass('hidden');

    if (!this.views.createCommentView) {
      this.views.createCommentView = new CreateCommentView({
        el: this.$('.createCommentContainer'),
        request: this.model
      });
    }
  },

  toggleMakeProposal: function (evt) {
    var $target = $(evt.target);

    this.$('.createProposalContainer').toggleClass('hidden');

    if (!this.views.createProposalView) {
      this.views.createProposalView = new CreateProposalView({
        el: this.$('.createProposalContainer'),
        request: this.model
      });
    }
  }

});

module.exports = RequestView;
