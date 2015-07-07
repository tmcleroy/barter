var NestedModel = require('./_nestedModel');
var Submissions = require('../collections/SubmissionsCollection');
var User = require('./userModel');
var Request = require('./requestModel');
var Proposal = require('./proposalModel');
var Comments = require('../collections/commentsCollection');

var marked = require('marked');

var SubmissionsModel = NestedModel.extend({
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
});

module.exports = SubmissionsModel;
