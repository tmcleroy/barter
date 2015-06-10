var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = Backbone.View.extend({
  template: require('../../templates/requests.ejs'),

  collection: null,

  events: {
  },

  initialize: function (params) {
    this.collection = new RequestsCollection();

    this.listenTo(this.collection, 'change sync', this.render);

    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      requests: this.collection.toJSON()
    }));
  }

});

module.exports = RequestsView;
