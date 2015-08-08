import Comment from 'scripts/models/commentModel';

const CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/api/comments'
});

export default CommentsCollection;
