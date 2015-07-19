var PaginatedView = require('./paginatedView');
var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = PaginatedView.extend({
  template: require('../../templates/request/requests.ejs'),

  initialize: function (params) {
    PaginatedView.prototype.initialize.call(this, arguments);
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.mine = params.mine;
    this.collection = new RequestsCollection();

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      requests: this.collection,
      mine: this.mine,
      sort: this.sort,
      page: this.page,
      pages: Math.ceil(this.collection.total / this.limit)
    }));
  }

});

module.exports = RequestsView;
