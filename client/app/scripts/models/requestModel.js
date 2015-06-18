var Requests = require('../collections/requestsCollection');
var Comments = require('../collections/commentsCollection');
var Tags = require('../collections/tagsCollection');
var Proposals = require('../collections/proposalsCollection');
var User = require('./userModel');

var RequestModel = Backbone.Model.extend({
  collection: Requests,

  urlRoot: '/api/requests/',

  // nested model and collection defs
  modelAndCollectionDefs: {
    'User': User,
    'Tags': Tags,
    'Comments': Comments,
    'Proposals': Proposals
  },

  parse: function (response) {
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    _.each(this.modelAndCollectionDefs, (Model, key) => {
      var raw = response[key];
      response[key] = new Model(raw, { parse: true });
    });
    return response;
  }
});

module.exports = RequestModel;
