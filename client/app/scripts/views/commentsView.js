var CommentsView = Backbone.View.extend({
  template: require('templates/comment/comments.ejs'),

  initialize: function (params) {
    this.render();

    this.listenTo(this.collection, 'sync change add', this.render);
  },

  render: function () {
    this.$el.html(this.template({
      comments: this.collection.toJSON()
    }));
  }

});

export default CommentsView;
