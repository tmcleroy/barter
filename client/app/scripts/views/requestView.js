var Request = require('../models/requestModel');
var ProposalsView = require('../views/proposalsView');
var CommentsView = require('../views/commentsView');
var TagsView = require('../views/tagsView');
var CreateProposalAndCommentView = require('../views/createProposalAndCommentView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/request/request.ejs'),

  views: {},

  initialize: function (params) {
    this.model = new Request({ id: params.id });

    this.listenTo(this.model, 'sync change add', this.render);
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      request: this.model
    }));
    new ProposalsView({
      collection: this.model.get('Proposals'),
      el: this.$('.proposalsContainer')
    });
    new TagsView({
      collection: this.model.get('Tags'),
      el: this.$('.tagsContainer')
    });
    new CommentsView({
      collection: this.model.get('Comments'),
      el: this.$('.commentsContainer')
    });
    new CreateProposalAndCommentView({
      el: this.$('.createProposalAndCommentContainer'),
      model: this.model
    });
  }
});

module.exports = RequestView;
