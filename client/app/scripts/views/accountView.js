var AccountView = Backbone.View.extend({
  template: require('../../templates/account.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = AccountView;
