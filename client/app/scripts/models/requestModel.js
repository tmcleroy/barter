import NestedModel from 'scripts/models/_nestedModel';
import marked from 'marked';

const RequestModel = NestedModel.extend({
  urlRoot: '/api/requests/',

  // nested model and collection defs
  nestedDefs: {
    'User': 'User',
    'Tags': 'Tags',
    'Comments': 'Comments',
    'Proposals': 'Proposals',
    'Submission': 'Submission'
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
});

export default RequestModel;
