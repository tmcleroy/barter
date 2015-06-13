var Request = require('../models/requestModel');
var CommentsView = require('../views/commentsView');
var CreateCommentView = require('../views/createCommentView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/request/request.ejs'),

  model: null,

  events: {
  },

  initialize: function (params) {
    this.model = new Request({ id: params.id });

    this.listenTo(this.model, 'change', this.render);
    this.model.fetch().done(_.bind(function () {
      new CommentsView({
        collection: this.model.get('Comments'),
        el: this.$('.commentsContainer')
      });
      new CreateCommentView({
        el: this.$('.createCommentContainer'),
        request: this.model
      });
    }, this));
  },

  render: function () {
    this.$el.html(this.template({
      model: this.model
    }));
  }

});

module.exports = RequestView;
