var PaginatedView = require('./paginatedView');
var ProposalsCollection = require('scripts/collections/proposalsCollection');

var ProposalsView = PaginatedView.extend({
  template: require('../../templates/proposal/proposals.ejs'),

  initialize: function (params) {
    this.mine = params.mine;
    this.collection = new ProposalsCollection();
    this.sorts = [
      { sort: '-createdAt', display: 'Newest' },
      { sort: 'createdAt', display: 'Oldest' },
      { sort: 'updatedAt', display: 'Recently Updated' }
    ];

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  render: function () {
    this.$el.html(this.template({
      proposals: this.collection,
      mine: this.mine,
      sort: this.sort,
      page: this.page,
      limit: this.limit,
      sorts: this.sorts,
      pages: Math.ceil(this.collection.total / this.limit)
    }));
    PaginatedView.prototype.render.call(this, arguments);
  }

});

module.exports = ProposalsView;
