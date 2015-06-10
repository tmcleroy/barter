var Requests = require('../collections/requestsCollection');

var RequestModel = Backbone.Model.extend({
  collection: Requests
});

module.exports = RequestModel;
