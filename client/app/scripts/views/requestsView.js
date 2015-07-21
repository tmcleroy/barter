var PaginatedView = require('./paginatedView');
var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = PaginatedView.extend({
  template: require('../../templates/request/requests.ejs'),

  initialize: function (params) {
    this.mine = params.mine;
    this.collection = new RequestsCollection();

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      requests: this.collection,
      mine: this.mine,
      sort: this.sort,
      page: this.page,
      limit: this.limit,
      pages: Math.ceil(this.collection.total / this.limit)
    }));
    PaginatedView.prototype.render.call(this, arguments);
  }

});

module.exports = RequestsView;
