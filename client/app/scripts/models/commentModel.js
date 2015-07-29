import Comments from '../collections/commentsCollection';

var CommentModel = Backbone.Model.extend({
  collection: Comments,

  urlRoot: '/api/comments'
});

export default CommentModel;
