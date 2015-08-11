import NestedModel from 'scripts/models/_nestedModel';

const CommentModel = NestedModel.extend({
  urlRoot: '/api/comments',

  nestedDefs: {
    User: 'User'
  }
});

export default CommentModel;
