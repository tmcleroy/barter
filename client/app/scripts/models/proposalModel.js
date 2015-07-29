import NestedModel from './_nestedModel';
import Submission from './submissionModel';
import Proposals from '../collections/proposalsCollection';
import StatefulHelper from './_statefulHelper';
import marked from 'marked';

var ProposalModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  collection: Proposals,

  urlRoot: '/api/proposals',

  nestedDefs: {
    'Submission': Submission
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }

}));

export default ProposalModel;
