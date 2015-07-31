var NestedModel = require('./_nestedModel');
var User = require('./userModel');
var Request = require('./requestModel');
var Proposal = require('./proposalModel');
var Comments = require('../collections/commentsCollection');
var StatefulHelper = require('./_statefulHelper');

var marked = require('marked');

var SubmissionsModel = NestedModel.extend(_.extend({}, StatefulHelper, {
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

module.exports = SubmissionsModel;
