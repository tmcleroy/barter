var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = Backbone.View.extend({
  template: require('../../templates/request/requests.ejs'),

  events: {
    'change [data-action="sort"]': 'sortChanged'
  },

  initialize: function (params) {
    this.sort = '-createdAt';
    this.mine = params.mine;
    this.collection = new RequestsCollection();
    _.each(params.collectionOverrides, (val, key) => {
      this.collection[key] = val;
    });

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      requests: this.collection,
      mine: this.mine,
      sort: this.sort
    }));
  },

  fetch: function () {
    this.collection.fetch({
      data: {
        sort: this.sort
      }
    });
  },

  sortChanged: function (evt) {
    var sort = $(evt.target).val();
    this.sort = sort;
    this.fetch();
  }

});

module.exports = RequestsView;
