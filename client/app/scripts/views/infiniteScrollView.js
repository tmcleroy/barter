// intended to be extended by views that want infinite scroll support
// the child view should implement fxn:renderAdditional. see inboxView.js
// the collection should implement fxn:fetchAdditional. see notificationsCollection.js
const InfiniteScrollView = Backbone.View.extend({

  initialize (params) {
    this.pageChangedThrottled = _.throttle(::this.pageChanged, 1000);

    this.page = params.page || 1;
    this.limit = Math.min(params.limit || 30, params.maxLimit || 100);
    this.cursor = this.limit * (this.page - 1);
    this.sort = params.sort || '-createdAt';
    this.scrollOffset = params.scrollOffset || 200;
    this.fetchOptions = params.fetchOptions || {};

    this.listenTo(this.collection, 'change sync', (collection) => {
      // enable infinite scroll if there are as many or more items than we can display initially
      if (this.collection.length >= this.limit) {
        $(window).on('scroll', _.throttle(::this.onScroll, 300));
      }
    });
  },

  fetch () {
    this.$el.addClass('loading');
    var opts = _.extend({
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    }, this.fetchOptions);
    this.collection.fetch({
      data: opts
    });
  },

  fetchAdditional () {
    this.$('.infiniteLoading').addClass('loading');
    var opts = _.extend({
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    }, this.fetchOptions);
    this.collection.fetchAdditional({
      data: opts
    }).done(::this.renderAdditional);
  },

  onScroll () {
    // user scrolled near bottom of page
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - this.scrollOffset) {
      this.pageChangedThrottled();
    }
  },

  pageChanged (evt) {
    this.page += 1;
    this.cursor = this.limit * (this.page - 1);
    console.log('page', this.page);
    console.log('cursor', this.cursor);
    this.fetchAdditional();
  },

  remove () {
    $(window).off('scroll');
  }
});

export default InfiniteScrollView;
