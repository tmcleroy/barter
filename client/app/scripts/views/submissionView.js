var Submission = require('../models/submissionModel');
var CommentsView = require('../views/commentsView');
var ModelHydrator = require('../models/_modelHydrator');

var SubmissionView = Backbone.View.extend({
  template: require('../../templates/submission/submission.ejs'),

  events: {
    'click [data-action^="state-"]': 'stateClicked',
    // 'click [data-global-action="collapse"]': 'collapse'
  },

  views: [],
  mine: false,

  initialize: function (params) {
    this.model = new Submission({ id: params.id });


    this.model.fetch().done((Submission) => {
      ModelHydrator.hydrateModels(this.model);
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

  stateClicked: function (evt) {
    var state = $(evt.target).attr('data-action').split(/state-/)[1];
    this.model.setState(state).done(_.bind(this.render, this));
  },
  //
  // collapse: function (evt) {
  //   evt.preventDefault();
  //   var $target = $(evt.target);
  //   var $container = $target.next('.collapsibleContainer');
  //   var collapsed = $container.attr('data-collapsed') === 'true';
  //   $target.text(collapsed ? 'hide' : 'show');
  //   $container.attr('data-collapsed', !collapsed);
  // },

  remove: function () {
    _.invoke(this.views, 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

module.exports = SubmissionView;
