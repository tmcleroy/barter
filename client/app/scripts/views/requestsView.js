var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = Backbone.View.extend({
  template: require('../../templates/request/requests.ejs'),

  initialize: function (params) {
    this.collection = new RequestsCollection();
    _.each(params.collectionOverrides, (val, key) => {
      this.collection[key] = val;
    });

    this.listenTo(this.collection, 'change sync', this.render);

    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      requests: this.collection
    }));
  }

});

module.exports = RequestsView;
