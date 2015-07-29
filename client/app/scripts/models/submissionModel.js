import NestedModel from './_nestedModel';
import Submissions from '../collections/submissionsCollection';
import User from './userModel';
import Request from './requestModel';
import Proposal from './proposalModel';
import Comments from '../collections/commentsCollection';
import StatefulHelper from './_statefulHelper';

var marked = require('marked');

var SubmissionsModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  collection: Submissions,

  urlRoot: '/api/submissions',

  nestedDefs: {
    'User': User,
    'Comments': Comments,
    'Proposal': Proposal,
    'Request': Request
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
}));

export default SubmissionsModel;
