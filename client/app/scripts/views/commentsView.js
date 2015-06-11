
var CommentsView = Backbone.View.extend({
  template: require('../../templates/comments/comments.ejs'),

  collection: null,

  events: {
  },

  initialize: function (params) {
    console.log(params);
    this.collection = params.collection;

    this.render();

    this.listenTo(this.collection, 'change sync', this.render);
  },

  render: function () {
    console.log('render comments');
    console.log(this.collection);
    this.$el.html(this.template({
      comments: this.collection.toJSON()
    }));
  }

});

module.exports = CommentsView;
