import template from 'templates/comment/comments.ejs';

const CommentsView = Backbone.View.extend({
  template,
  initialize (params) {
    this.render();

    this.listenTo(this.collection, 'sync change add', this.render);
  },

  render () {
    this.$el.html(this.template({
      comments: this.collection
    }));
  }

});

export default CommentsView;
