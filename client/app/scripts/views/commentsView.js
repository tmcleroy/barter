
var CommentsView = Backbone.View.extend({
  template: require('../../templates/comments/comments.ejs'),

  collection: null,

  events: {
  },

  initialize: function (params) {
    this.collection = params.collection;

    this.render();

    this.listenTo(this.collection, 'change sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({
      comments: this.collection.toJSON()
    }));
  }

});

module.exports = CommentsView;
