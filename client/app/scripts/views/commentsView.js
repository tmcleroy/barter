const CommentsView = Backbone.View.extend({
  template: require('templates/comment/comments.ejs'),

  initialize (params) {
    this.render();

    this.listenTo(this.collection, 'sync change add', this.render);
  },

  render () {
    this.$el.html(this.template({
      comments: this.collection.toJSON()
    }));
  }

});

export default CommentsView;
