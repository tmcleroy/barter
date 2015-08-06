var CreateCommentView = require('./createCommentView');
var CreateProposalView = require('./createProposalView');
var TabHelper = require('../helpers/_tabHelper');


var CreateProposalAndCommentView = Backbone.View.extend(_.extend(TabHelper, {
  template: require('../../templates/request/createProposalAndComment.ejs'),

  views: {},

  events: {
    'click [data-action="addComment"]': 'toggleAddComment',
    'click [data-action="addProposal"]': 'toggleAddProposal'
  },

  initialize: function (params) {
    this.mine = params.mine;
    this.views = {};
    this.render();
    _.defer(() => { this.$('[data-action="addComment"]').click(); });
  },

  render: function () {
    this.$el.html(this.template({
      mine: this.mine
    }));
  },

  toggleAddComment: function (evt) {
    evt.preventDefault();
    var $target = $(evt.target).closest('li[role="presentation"]');
    if (!$target.hasClass('active')) {
      this.toggleTabs($target);
      this.$('.createCommentContainer').toggleClass('hidden');

      if (!this.views.createCommentView) {
        this.views.createCommentView = new CreateCommentView({
          el: this.$('.createCommentContainer'),
          collection: this.model.get('Comments'),
          request: this.model
        });
      }
    }
  },

  toggleAddProposal: function (evt) {
    evt.preventDefault();
    var $target = $(evt.target).closest('li[role="presentation"]');
    if (!$target.hasClass('active')) {
      this.toggleTabs($target);
      this.$('.createProposalContainer').toggleClass('hidden');

      if (!this.views.createProposalView) {
        this.views.createProposalView = new CreateProposalView({
          el: this.$('.createProposalContainer'),
          collection: this.model.get('Proposals'),
          request: this.model
        });
      }
    }
  },

  remove: function () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }

}));

module.exports = CreateProposalAndCommentView;
