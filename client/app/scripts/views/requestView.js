var Request = require('../models/requestModel');
var CommentsView = require('../views/commentsView');
var TagsView = require('../views/tagsView');
var ProposalsView = require('../views/proposalsView');
var CreateCommentView = require('../views/createCommentView');
var CreateProposalView = require('../views/createProposalView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/request/request.ejs'),

  views: {},

  events: {
    'click [data-action="addComment"]': 'toggleAddComment',
    'click [data-action="makeProposal"]': 'toggleMakeProposal'
  },

  initialize: function (params) {
    this.model = new Request({ id: params.id });

    this.listenTo(this.model, 'sync change add', this.render);
    this.model.fetch();
  },

  render: function () {
    console.log(this.model);
    this.$el.html(this.template({
      request: this.model
    }));
    new TagsView ({
      collection: this.model.get('Tags'),
      el: this.$('.tagsContainer')
    });
    new ProposalsView({
      collection: this.model.get('Proposals'),
      el: this.$('.proposalsContainer')
    });
    new CommentsView({
      collection: this.model.get('Comments'),
      el: this.$('.commentsContainer')
    });
  },

  toggleAddComment: function (evt) {
    this.$('.createCommentContainer').toggleClass('hidden');

    if (!this.views.createCommentView) {
      this.views.createCommentView = new CreateCommentView({
        el: this.$('.createCommentContainer'),
        collection: this.model.get('Comments'),
        request: this.model
      });
    }
  },

  toggleMakeProposal: function (evt) {
    this.$('.createProposalContainer').toggleClass('hidden');

    if (!this.views.createProposalView) {
      this.views.createProposalView = new CreateProposalView({
        el: this.$('.createProposalContainer'),
        collection: this.model.get('Proposals'),
        request: this.model
      });
    }
  }

});

module.exports = RequestView;
