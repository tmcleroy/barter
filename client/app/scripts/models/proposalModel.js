import NestedModel from 'scripts/models/_nestedModel';
import StatefulHelper from 'scripts/models/_statefulHelper';
import marked from 'marked';

const ProposalModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  urlRoot: '/api/proposals',

  nestedDefs: {
    User: 'User',
    Submission: 'Submission',
    Request: 'Request'
  },

  getBodyFormatted () {
    return `<div class="markdown body">${marked(this.get('body'))}</div>`;
  }

}));

export default ProposalModel;
