var Requests = require('../collections/requestsCollection');

var RequestModel = Backbone.Model.extend({
  collection: Requests,

  url: function () {
    return '/api/requests/' + this.id;
  }
});

module.exports = RequestModel;
