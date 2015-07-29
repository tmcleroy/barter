import PaginatedView from './paginatedView';
import RequestsCollection from '../collections/requestsCollection';

const RequestsView = PaginatedView.extend({
  template: require('../../templates/request/requests.ejs'),

  events: {
    'change [data-action="tags"]': 'tagsChanged'
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
    this.events = _.extend(PaginatedView.prototype.events, this.events);

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
  },

  tagsChanged (evt) {
    var $target = $(evt.target);
    var val = $target.val();
    this.fetch();
  },

  render () {
    console.log(this.collection);
    this.$el.html(this.template({
      requests: this.collection,
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

export default RequestsView;
