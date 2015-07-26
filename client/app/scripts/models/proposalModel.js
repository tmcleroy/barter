var NestedModel = require('./_nestedModel');
var Submission = require('./submissionModel');
var Proposals = require('../collections/proposalsCollection');
var StatefulHelper = require('./_statefulHelper');
var marked = require('marked');

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
