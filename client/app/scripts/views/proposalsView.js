import PaginatedView from 'scripts/views/paginatedView';
import ProposalsCollection from 'scripts/collections/proposalsCollection';
import template from 'templates/proposal/proposals.ejs';

const ProposalsView = PaginatedView.extend({
  template,
  initialize (params) {
    this.collection = new ProposalsCollection();
    this.sorts = [
      { sort: '-createdAt', display: 'Newest' },
      { sort: 'createdAt', display: 'Oldest' },
      { sort: 'updatedAt', display: 'Recently Updated' }
    ];
    params.sort = params.sort ? params.sort : 'updatedAt';

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.listenTo(this.collection, 'change sync', this.render);
  },

  render () {
    this.$el.html(this.template({
      proposals: this.collection,
      mine: this.model.get('mine'),
      sort: this.model.get('sort'),
      page: this.model.get('page'),
      limit: this.model.get('limit'),
      sorts: this.sorts,
      pages: Math.ceil(this.collection.total / this.model.get('limit'))
    }));
    PaginatedView.prototype.render.call(this, arguments);
  }

});

export default ProposalsView;
