var PaginatedView = require('./paginatedView');
var ProposalsCollection = require('../collections/proposalsCollection');

var ProposalsView = PaginatedView.extend({
  template: require('../../templates/proposal/proposals.ejs'),

  initialize: function (params) {
    console.log('init');
    PaginatedView.prototype.initialize.call(this, arguments);
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.mine = params.mine;
    this.collection = new ProposalsCollection();

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
  }

});

module.exports = ProposalsView;
