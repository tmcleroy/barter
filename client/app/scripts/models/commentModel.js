var Comments = require('../collections/CommentsCollection');

var CommentModel = Backbone.Model.extend({
  collection: Comments,

  urlRoot: '/api/comments'

  // url: function () {
  //   return '/api/comments/' + this.id;
  // }
});

module.exports = CommentModel;
