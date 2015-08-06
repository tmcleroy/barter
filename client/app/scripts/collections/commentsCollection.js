var Comment = require('scripts/models/commentModel');

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/api/comments'
});

module.exports = CommentsCollection;
