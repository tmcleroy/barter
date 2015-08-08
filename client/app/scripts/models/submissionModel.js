import NestedModel from 'scripts/models/_nestedModel';
import StatefulHelper from './_statefulHelper';

import marked from 'marked';

const SubmissionsModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  urlRoot: '/api/submissions',

  nestedDefs: {
    'User': 'User',
    'Comments': 'Comments',
    'Proposal': 'Proposal',
    'Request': 'Request'
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
}));

export default SubmissionsModel;
