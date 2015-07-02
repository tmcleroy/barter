var NestedModel = require('./_nestedModel');
var Requests = require('../collections/requestsCollection');
var Comments = require('../collections/commentsCollection');
var Tags = require('../collections/tagsCollection');
var Proposals = require('../collections/proposalsCollection');
var User = require('./userModel');
var markdown = require('markdown').markdown;

var RequestModel = NestedModel.extend({
  collection: Requests,

  urlRoot: '/api/requests/',

  // nested model and collection defs
  nestedDefs: {
    'User': User,
    'Tags': Tags,
    'Comments': Comments,
    'Proposals': Proposals
  },

  getBodyFormatted: function () {
    return markdown.toHTML(this.get('body'));
  }
});

module.exports = RequestModel;
