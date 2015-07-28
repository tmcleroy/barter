import NestedModel from './_nestedModel';
import Requests from '../collections/requestsCollection';
import Comments from '../collections/commentsCollection';
import Tags from '../collections/tagsCollection';
import Proposals from '../collections/proposalsCollection';
import Submission from './submissionModel';
import User from './userModel';
import marked from 'marked';

var RequestModel = NestedModel.extend({
  collection: Requests,

  urlRoot: '/api/requests/',

  // nested model and collection defs
  nestedDefs: {
    'User': User,
    'Tags': Tags,
    'Comments': Comments,
    'Proposals': Proposals,
    'Submission': Submission
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
});

export default RequestModel;
