var Comments = require('../collections/CommentsCollection');

var CommentModel = Backbone.Model.extend({
  collection: Comments,

  urlRoot: '/api/comments'
});

module.exports = CommentModel;
