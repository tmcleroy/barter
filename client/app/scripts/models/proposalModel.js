var NestedModel = require('scripts/models/_nestedModel');
var StatefulHelper = require('scripts/models/_statefulHelper');
var marked = require('marked');

var ProposalModel = NestedModel.extend(_.extend({}, StatefulHelper, {
  urlRoot: '/api/proposals',

  nestedDefs: {
    'Submission': 'Submission'
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }

}));

module.exports = ProposalModel;
