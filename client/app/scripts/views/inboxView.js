import PaginatedView from 'scripts/views/paginatedView';
import Notifications from 'scripts/collections/notificationsCollection';

const InboxView = PaginatedView.extend({
  template: require('templates/inbox.ejs'),

  scrollOffset: 500,

  events () {
    return _.extend({}, PaginatedView.prototype.events, {
      'click [data-action="seen"]': 'seenNotification',
      'click [data-action="all-seen"]': 'seenAll'
    });
  },

  initialize (params) {
    this.collection = new Notifications();

    PaginatedView.prototype.initialize.call(this, _.extend({}, params, params.options));

    $(window).on('scroll', _.throttle(::this.onScroll, 100));
    this.listenTo(this.collection, 'change sync', this.collectionChanged);
    this.fetch();
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

  onScroll () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - this.scrollOffset) {
      console.log('they hatin');
    }
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

  seenNotification (evt) {
    this.collection.findWhere({ id: parseInt($(evt.target).attr('data-id'), 10) }).setState('seen');
  },

  seenAll (evt) {
    this.collection.setAllSeen().done(::this.fetch);
  }
});

export default InboxView;
