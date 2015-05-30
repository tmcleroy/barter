window.$ = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;
// views and models
var MainView = require('./scripts/views/mainView');

$(function () { // document ready

  window.MAIN = { // global object
  };

  var mainView = new MainView({
    el: $('<div class="mainViewContainer" />').appendTo('#appContainer')
  });
});
