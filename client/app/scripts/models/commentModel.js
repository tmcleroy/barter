var Comments = require('../collections/commentsCollection');

var CommentModel = Backbone.Model.extend({
  collection: Comments,

  urlRoot: '/api/comments'
});

module.exports = CommentModel;
