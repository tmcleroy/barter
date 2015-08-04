var Request = require('../models/requestModel');
var ProposalsSummaryView = require('../views/proposalsSummaryView');
var RequestProposalsView = require('../views/requestProposalsView');
var CommentsView = require('../views/commentsView');
var TagsView = require('../views/tagsView');
var CreateProposalAndCommentView = require('../views/createProposalAndCommentView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/request/request.ejs'),

  views: [],
  mine: false,

  initialize: function (params) {
    this.options = params.options;
    console.log(this.options);
    this.model = new Request({ id: params.id });

    this.model.fetch().done((Request) => {
      this.mine = App.user.get('id') === Request.UserId;
      this.render();
      this.listenTo(this.model, 'change', this.render);
    });
  },

  render: function () {
    this.$el.html(this.template({
      request: this.model
    }));
    this.views = [
      new ProposalsSummaryView({
        collection: this.model.get('Proposals'),
        el: this.$('.proposalsSummaryContainer')
      }),
      new TagsView({
        collection: this.model.get('Tags'),
        el: this.$('.tagsContainer')
      }),
      new CommentsView({
        collection: this.model.get('Comments'),
        el: this.$('.commentsContainer')
      }),
      new CreateProposalAndCommentView({
        el: this.$('.createProposalAndCommentContainer'),
        model: this.model,
        mine: this.mine
      })
    ];

    if (this.mine) {
      this.views.push(new RequestProposalsView({
        collection: this.model.get('Proposals'),
        el: this.$('.proposalsContainer')
      }));
    }
    if (this.options && this.options.goto) {
      $('html, body').scrollTop($(this.options.goto).offset().top);
      $(this.options.goto).addClass('highlighted');
    }
  },

  remove: function () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

module.exports = RequestView;
