var PaginatedCollection = require('./_paginatedCollection');
var Request = require('scripts/models/requestModel');

var RequestsCollection = PaginatedCollection.extend({
  model: Request,

  url: '/api/requests'
});

module.exports = RequestsCollection;
