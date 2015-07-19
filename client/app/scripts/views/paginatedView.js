var PaginatedView = Backbone.View.extend({
  events: {
    'change [data-action="sort"]': 'sortChanged',
    'click a[data-page]': 'pageChanged'
  },

  initialize: function (params) {
    this.page = 1;
    this.cursor = 0;
    this.limit = params.limit || 10;
    this.sort = params.defaultSort || '-createdAt';
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

module.exports = PaginatedView;
