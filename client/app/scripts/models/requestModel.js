var Requests = require('../collections/requestsCollection');
var Comments = require('../collections/commentsCollection');
var User = require('./userModel');

var RequestModel = Backbone.Model.extend({
  collection: Requests,

  // nested model and collection defs
  modelAndCollectionDefs: {
    'User': User,
    'Comments': Comments
  },

  parse: function (response){
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    _.each(this.modelAndCollectionDefs, function (Model, key) {
      var raw = response[key];
      response[key] = new Model(raw, { parse: true });
    });
    return response;
  },

  url: function () {
    return '/api/requests/' + this.id;
  }
});

module.exports = RequestModel;
