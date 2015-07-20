var PaginatedView = Backbone.View.extend({
  events: {
    'change [data-action="sort"]': 'sortChanged',
    'click a[data-page]': 'pageChanged'
  },

  initialize: function (params) {
    this.page = params.page || 1;
    this.limit = Math.min(params.limit || 10, params.maxLimit || 100);
    this.cursor = this.limit * (this.page - 1);
    this.sort = params.sort || '-createdAt';
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
    this.cursor = this.limit * (this.page - 1);
    this.fetch();
  },

  updateUrl: function () {
    var options = {
      page: this.page,
      limit: this.limit
    };
    var split = window.location.pathname.split(/\//);
    // if there is a non-word character in the last segment (options are present)
    if (split[split.length - 1].match(/\W/)) {
      split.pop(); // pop off old options
    }
    App.Router.navigate(`${ split.join('/') }/${ JSON.stringify(options) }`);
  }

});

module.exports = PaginatedView;
