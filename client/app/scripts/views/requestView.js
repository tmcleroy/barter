var Request = require('../models/requestModel');
var CommentsView = require('../views/commentsView');

var RequestView = Backbone.View.extend({
  template: require('../../templates/requests/request.ejs'),

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
    }, this));
  },

  render: function () {
    this.$el.html(this.template({
      model: this.model
    }));
  }

});

module.exports = RequestView;
