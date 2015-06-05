var MainContentView = require('./mainContentView.js');
var SideBarView = require('./sideBarView.js');

var AppView = Backbone.View.extend({
  template: require('../../templates/app.ejs'),

  events: {
  },

  initialize: function (params) {
    this.render();

    new MainContentView({
      el: this.$('.mainContentContainer'),
      subview: 'dashboard'
    });
    new SideBarView({
      el: this.$('.sideBarContainer')
    });
  },

  render: function () {
    this.$el.html(this.template());
  }

});

module.exports = AppView;
