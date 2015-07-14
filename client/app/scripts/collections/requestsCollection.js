var Request = require('../models/requestModel');

var RequestsCollection = Backbone.Collection.extend({
  model: Request,

  url: '/api/requests',

  parse: function (data) {
    this.total = data.total;
    return data.items;
  }
});

module.exports = RequestsCollection;
