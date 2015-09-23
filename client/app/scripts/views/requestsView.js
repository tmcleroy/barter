import PaginatedView from 'scripts/views/paginatedView';
import AdvancedSearchView from 'scripts/views/advancedSearchView';
import Requests from 'scripts/collections/requestsCollection';
import template from 'templates/request/requests.ejs';

const RequestsView = PaginatedView.extend({
  template,
  initialize (params) {
    this.collection = new Requests();
    this.sorts = [
      { sort: '-createdAt', display: 'Time (newest first)' },
      { sort: 'createdAt', display: 'Time (oldest first)' },
      { sort: 'updatedAt', display: 'Recently Updated' },
      { sort: '-offer', display: 'Offer (highest first)' },
      { sort: 'offer', display: 'Offer (lowest first)' },
      { sort: '-avgProposal', display: 'Avg Proposal (highest first)' },
      { sort: 'avgProposal', display: 'Avg Proposal (lowest first)' }
    ];

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));

    this.listenTo(this.collection, 'change sync', this.render);
  },

  render () {
    const advancedRules = this.model.get('advancedRules');
    this.$el.html(this.template({
      requests: this.collection,
      mine: this.model.get('mine'),
      sort: this.model.get('sort'),
      page: this.model.get('page'),
      limit: this.model.get('limit'),
      sorts: this.sorts,
      pages: Math.ceil(this.collection.total / this.model.get('limit')),
      activeRules: advancedRules.getNumActive()
    }));
    new AdvancedSearchView({
      el: this.$('.advancedSearchContainer .content'),
      collection: advancedRules
    });
    PaginatedView.prototype.render.call(this, arguments);
  }
});

export default RequestsView;
