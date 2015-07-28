var InboxView = Backbone.View.extend({
  template: require('../../templates/inbox.ejs'),

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      user: this.model
    }));
  }
});

export default InboxView;
