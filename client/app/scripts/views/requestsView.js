import PaginatedView from 'scripts/views/paginatedView';
import AdvancedSearchView from 'scripts/views/advancedSearchView';
import Requests from 'scripts/collections/requestsCollection';
import SearchRules from 'scripts/collections/searchRuleCollection';
import template from 'templates/request/requests.ejs';

const RequestsView = PaginatedView.extend({
  template,
  initialize (params) {
    this.mine = params.mine;
    this.collection = new Requests();
    this.sorts = [
      { sort: '-createdAt', display: 'Newest' },
      { sort: 'createdAt', display: 'Oldest' },
      { sort: 'updatedAt', display: 'Recently Updated' },
      { sort: '-offer', display: 'Highest Offer' },
      { sort: 'offer', display: 'Lowest Offer' }
    ];
    const options = (params.options && params.options.where && params.options.where.$and);
    this.searchRules = new SearchRules(options, { parse: !!options });

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));

    this.listenTo(this.collection, 'change sync', this.render);
    this.listenTo(this.searchRules, 'change remove reset', this.rulesChanged);

    this.fetch(!!this.searchRules.length, this.searchRules.getWhereQuery());
  },

  render () {
    this.$el.html(this.template({
      requests: this.collection,
      mine: this.mine,
      sort: this.sort,
      page: this.page,
      limit: this.limit,
      sorts: this.sorts,
      pages: Math.ceil(this.collection.total / this.limit)
    }));
    new AdvancedSearchView({
      el: this.$('.advancedSearchContainer .content'),
      collection: this.searchRules
    });
    PaginatedView.prototype.render.call(this, arguments);
  },

  rulesChanged () {
    this.fetch(true, this.searchRules.getWhereQuery());
  }
});

export default RequestsView;
