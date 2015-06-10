var Request = require('../models/requestModel');

var RequestsCollection = Backbone.Collection.extend({
  model: Request,
  url: '/api/requests'
});

module.exports = RequestsCollection;
