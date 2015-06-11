var Requests = require('../collections/requestsCollection');
var User = require('./userModel');

var RequestModel = Backbone.Model.extend({
  collection: Requests,

  // nested model defs
  model: {
    'User': User,
  },

  parse: function (response){
    // allows for nested Backbone models
    // concept adapted from http://stackoverflow.com/a/9904874
    _.each(this.model, function (Model, key) {
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