var NestedModel = require('./_nestedModel');
var Comments = require('../collections/commentsCollection');
var Tags = require('../collections/tagsCollection');
var Proposals = require('../collections/proposalsCollection');
var Submission = require('./submissionModel');
var User = require('./userModel');
var marked = require('marked');

var RequestModel = NestedModel.extend({
  urlRoot: '/api/requests/',

  // nested model and collection defs
  nestedDefs: {
    'User': User,
    'Tags': Tags,
    'Comments': Comments,
    'Proposals': Proposals,
    'Submission': Submission
  },

  getBodyFormatted: function () {
    return '<div class="markdown body">' + marked(this.get('body')) + '</div>';
  }
});

module.exports =  RequestModel;
