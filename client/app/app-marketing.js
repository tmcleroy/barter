window.$ = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router-marketing');

$(function () { // document ready

  window.App = new Router();
  Backbone.history.start();

});
