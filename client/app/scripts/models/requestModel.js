var NestedModel = require('./_nestedModel');
var Requests = require('../collections/requestsCollection');
var Comments = require('../collections/commentsCollection');
var Tags = require('../collections/tagsCollection');
var Proposals = require('../collections/proposalsCollection');
var User = require('./userModel');
var marked = require('marked');

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
    return marked(this.get('body'));
  }
});

module.exports = RequestModel;
