var PaginatedView = require('./paginatedView');
var RequestsCollection = require('../collections/requestsCollection');

var RequestsView = PaginatedView.extend({
  template: require('../../templates/request/requests.ejs'),

  _events: { // MAY NOT WORK AT THE MOMENT
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
    this.events = _.extend({}, PaginatedView.prototype.events, this._events);

    this.listenTo(this.collection, 'change sync', this.render);

    this.fetch();
    console.log(this.events);
  },

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
    PaginatedView.prototype.render.call(this, arguments);
  }

});

module.exports =  RequestsView;
