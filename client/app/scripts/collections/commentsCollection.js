import Comment from 'scripts/models/commentModel';

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/api/comments'
});

export default CommentsCollection;
