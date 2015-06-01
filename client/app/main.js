window.$ = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;
// views and models
var MainView = require('./scripts/views/mainView');
var HeaderView = require('./scripts/views/headerView');
var FooterView = require('./scripts/views/footerView');

$(function () { // document ready

  window.MAIN = { // global object
  };

  new HeaderView({
    el: $('<div class="headerViewContainer" />').appendTo('#headerContainer')
  });

  new MainView({
    el: $('<div class="mainViewContainer" />').appendTo('#appContainer')
  });

  new FooterView({
    el: $('<div class="footerViewContainer" />').appendTo('#footerContainer')
  });
});
