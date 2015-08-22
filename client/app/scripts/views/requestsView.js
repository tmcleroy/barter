import PaginatedView from 'scripts/views/paginatedView';
import AdvancedSearchView from 'scripts/views/advancedSearchView';
import RequestsCollection from 'scripts/collections/requestsCollection';

const RequestsView = PaginatedView.extend({
  template: require('templates/request/requests.ejs'),

  events () {
    return _.extend({}, PaginatedView.prototype.events, {
      'change [data-action="tags"]': 'tagsChanged'
    });
  },

  initialize (params) {
    this.mine = params.mine;
    this.collection = new RequestsCollection();
    this.sorts = [
      { sort: '-createdAt', display: 'Newest' },
      { sort: 'createdAt', display: 'Oldest' },
      { sort: 'updatedAt', display: 'Recently Updated' },
      { sort: '-offer', display: 'Highest Offer' },
      { sort: 'offer', display: 'Lowest Offer' }
    ];

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  // keeping this around for when we are ready to implement filtering by tags
  tagsChanged (evt) {
    var $target = $(evt.target);
    var val = $target.val();
    this.fetch();
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
      el: this.$('.advancedSearchContainer .content')
    });
    PaginatedView.prototype.render.call(this, arguments);
  }

});

export default RequestsView;
