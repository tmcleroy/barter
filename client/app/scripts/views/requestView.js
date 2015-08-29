import Request from 'scripts/models/requestModel';
import ProposalsSummaryView from 'scripts/views/proposalsSummaryView';
import RequestProposalsView from 'scripts/views/requestProposalsView';
import CommentsView from 'scripts/views/commentsView';
import TagsView from 'scripts/views/tagsView';
import CreateProposalAndCommentView from 'scripts/views/createProposalAndCommentView';
import template from 'templates/request/request.ejs';

const RequestView = Backbone.View.extend({
  template,
  views: [],
  mine: false,

  initialize (params) {
    this.options = params.options;
    this.model = new Request({ id: params.id });

    this.model.fetch().done((Request) => {
      this.mine = App.user.get('id') === Request.UserId;
      this.render();
      this.listenTo(this.model, 'change', this.render);
    });
  },

  render () {
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

  remove () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

export default RequestView;
