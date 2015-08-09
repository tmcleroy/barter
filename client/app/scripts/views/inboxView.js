import PaginatedView from 'scripts/views/paginatedView';
import Notifications from 'scripts/collections/notificationsCollection';

const InboxView = PaginatedView.extend({
  template: require('templates/inbox.ejs'),

  scrollOffset: 200, // pixels from the bottom of the screen to trigger a infinite fetch
  limit: 30, // number of items to fetch at a time
  infinite: false,

  events () {
    return _.extend({}, PaginatedView.prototype.events, {
      'click [data-action="seen"]': 'seenNotification',
      'click [data-action="all-seen"]': 'seenAll'
    });
  },

  initialize (params) {
    this.collection = new Notifications();
    this.limit = params.options.limit || this.limit;

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));

    this.listenTo(this.collection, 'change sync', (collection) => {
      // enable infinite scroll if there as many or more items than we can display initially
      if (this.collection.length >= this.limit) {
        $(window).on('scroll', _.throttle(::this.onScroll, 300));
      }
      this.collectionChanged();
    });
    this.fetch();
    this.pageChangedThrottled = _.throttle(::this.pageChanged, 1000);
  },

  // OVERRIDE
  fetch () {
    this.$el.addClass('loading');
    const opts = {
      where: 'unseen',
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    };
    this.collection.fetch({
      data: opts
    });
  },

  fetchAdditional () {
    this.$('.infiniteLoading').addClass('loading');
    const opts = {
      where: 'unseen',
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    };
    this.collection.fetchAdditional(opts).done(::this.renderAdditional);
  },

  onScroll () {
    // user scrolled near bottom of page
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - this.scrollOffset) {
      this.pageChangedThrottled();
    }
  },

  // OVERRIDE
  pageChanged (evt) {
    this.page += 1;
    this.cursor = this.limit * (this.page - 1);
    this.fetchAdditional();
  },

  collectionChanged () {
    this.render();
    Backbone.trigger('change:notifications');
  },

  render () {
    this.$el.html(this.template({
      notifications: this.collection
    }));
    this.$el.removeClass('loading');
  },

  renderAdditional (data) {
    let html = '';
    if (data.items.length) { // we got some items to render
      const notifications = new Notifications(data, { parse: true });
      notifications.each((notification) => {
        html += require('templates/notification/notificationListItem.ejs')({ notification: notification });
      });
    } else { // no items returned from server, disable infinite scrolling
      $(window).off('scroll');
    }
    this.$('.notifications').append(html);
    this.$('.infiniteLoading').removeClass('loading');
  },

  seenNotification (evt) {
    this.collection.findWhere({ id: parseInt($(evt.target).attr('data-id'), 10) }).setState('seen');
  },

  seenAll (evt) {
    this.collection.setAllSeen().done(::this.fetch);
  },

  remove () {
    $(window).off('scroll');
  }
});

export default InboxView;
