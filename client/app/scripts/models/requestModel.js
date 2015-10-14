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

  parse (response) {
    // keep the tags in the order in which they were added by the request creator
    if (response.tagOrder) {
      response.Tags = response.tagOrder.split(',').map(id => _(response.Tags).findWhere({ id: parseInt(id, 10) }));
    }
    return NestedModel.prototype.parse.apply(this, arguments);
  },

  getBodyFormatted () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
});

export default RequestModel;
