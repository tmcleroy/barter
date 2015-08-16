import CreateCommentView from 'scripts/views/createCommentView';
import CreateProposalView from 'scripts/views/createProposalView';
import TabbedView from 'scripts/views/tabbedView';
import template from 'templates/request/createProposalAndComment.ejs';

const CreateProposalAndCommentView = TabbedView.extend({
  template,
  views: {},

  initialize (params) {
    this.mine = params.mine;
    this.views = {};
    this.render();
    _.defer(() => { this.$('[data-action="toggleAddComment"]').click(); });
  },

  render () {
    this.$el.html(this.template({
      mine: this.mine
    }));
  },

  tabChanged (action) {
    this.$('.actionContainer').addClass('hidden');
    this[action]();
  },

  toggleAddComment () {
    this.$('.createCommentContainer').toggleClass('hidden');

    if (!this.views.createCommentView) {
      this.views.createCommentView = new CreateCommentView({
        el: this.$('.createCommentContainer'),
        collection: this.model.get('Comments'),
        request: this.model
      });
    }
  },

  toggleAddProposal () {
    this.$('.createProposalContainer').toggleClass('hidden');

    if (!this.views.createProposalView) {
      this.views.createProposalView = new CreateProposalView({
        el: this.$('.createProposalContainer'),
        collection: this.model.get('Proposals'),
        request: this.model
      });
    }
  },

  remove () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }

});

export default CreateProposalAndCommentView;
