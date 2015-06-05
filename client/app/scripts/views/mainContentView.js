var DashboardView = require('./dashboardView.js');
var ProfileView = require('./profileView.js');
var AccountView = require('./accountView.js');

var MainContentView = Backbone.View.extend({
  template: require('../../templates/mainContent.ejs'),

  subviewDefs: {
    dashboard: {
      view: DashboardView,
      opts: {}
    },
    profile: {
      view: ProfileView,
      opts: {}
    },
    account: {
      view: AccountView,
      opts: {}
    }
  },

  events: {
    'click [data-view]:not(.active)': 'changeSubview'
  },

  initialize: function (params) {
    this.render({
      subview: params.subview
    });

    this.setView(params.subview);
  },

  render: function () {
    this.$el.html(this.template());
  },

  setView: function (subview) {
    this.$('.mainContent').empty();
    if (this.currentView) {
      // this.currentView.remove();
    }

    var subDef = this.subviewDefs[subview];
    this.currentView = new subDef.view(_.extend({
      el: this.$('.mainContent')
    }, subDef.opts));

    this.$('[data-view]').removeClass('active');
    this.$('[data-view="' + subview + '"]').addClass('active');
  },

  changeSubview: function (evt) {
    evt.preventDefault();
    var subview = $(evt.target).closest('[data-view]').attr('data-view');
    this.setView(subview);
  }

});

module.exports = MainContentView;
