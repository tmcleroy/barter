import InfiniteScrollView from 'scripts/views/infiniteScrollView';
import Notifications from 'scripts/collections/notificationsCollection';
import template from 'templates/inbox.ejs';

const InboxView = InfiniteScrollView.extend({
  template,
  events () {
    return _.extend({}, InfiniteScrollView.prototype.events, {
      'click [data-action="seen"]': 'seenNotification',
      'click [data-action="all-seen"]': 'seenAll'
    });
  },

  initialize (params) {
    this.collection = new Notifications();
    params.fetchOptions = { where: 'unseen' };

    InfiniteScrollView.prototype.initialize.call(this, _.extend({}, params));

    this.listenTo(this.collection, 'change sync', ::this.collectionChanged);

    this.fetch();
  },

  seenNotification (evt) {
    this.collection.findWhere({
      id: parseInt($(evt.target).attr('data-id'), 10)
    }).setState('seen');
  },

  seenAll (evt) {
    this.collection.setAllSeen().done(::this.fetch);
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
    }
    if (data.items.length < this.limit) { // rendered last page of results
      $(window).off('scroll');
    }
    this.$('.notifications').append(html);
    this.$('.infiniteLoading').removeClass('loading');
  }
});

export default InboxView;
