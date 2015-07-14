var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = Backbone.View.extend({
  template: require('../../templates/request/requests.ejs'),

  events: {
    'change [data-action="sort"]': 'sortChanged',
    'click a[data-page]': 'pageChanged'
  },

  initialize: function (params) {
    this.page = 1;
    this.cursor = 0;
    this.limit = 10;
    this.sort = '-createdAt';
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
  },

  fetch: function () {
    var opts = {
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    };
    if (this.mine) { opts.mine = true; }
    this.collection.fetch({
      data: opts
    });
  },

  sortChanged: function (evt) {
    var sort = $(evt.target).val();
    this.sort = sort;
    this.fetch();
  },

  pageChanged: function (evt) {
    evt.preventDefault();
    var val = $(evt.currentTarget).attr('data-page');
    if (_.isNaN(parseInt(val, 10))) { // prev or next
      this.page += { next: 1, prev: -1 }[val];
    } else { // numerical page
      this.page = parseInt(val, 10);
    }
    this.cursor = (this.page - 1) * this.limit;
    this.fetch();
  }

});

module.exports = RequestsView;
