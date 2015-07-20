var PaginatedView = require('./paginatedView');
var ProposalsCollection = require('../collections/proposalsCollection');

var ProposalsView = PaginatedView.extend({
  template: require('../../templates/proposal/proposals.ejs'),

  initialize: function (params) {
    this.mine = params.mine;
    this.collection = new ProposalsCollection();

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
      pages: Math.ceil(this.collection.total / this.limit)
    }));
    this.updateUrl();
  }

});

module.exports = ProposalsView;
