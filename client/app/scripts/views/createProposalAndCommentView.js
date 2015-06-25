var CreateCommentView = require('./createCommentView');
var CreateProposalView = require('./createProposalView');


var CreateProposalAndCommentView = Backbone.View.extend({
  template: require('../../templates/request/createProposalAndComment.ejs'),

  views: {},

  events: {
    'click [data-action="addComment"]': 'toggleAddComment',
    'click [data-action="addProposal"]': 'toggleAddProposal'
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
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

  toggleTabs: function ($activeTab) {
    this.$('li[role="presentation"]').removeClass('active');
    this.$('.actionContainer').addClass('hidden');
    // add active class to parent so the container panel becomes visible
    $activeTab.addClass('active').parent().addClass('active');
  }

});

module.exports = CreateProposalAndCommentView;
