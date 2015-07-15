window.$ = require('jquery');
window.jQuery = window.$;
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./scripts/router');
var Api = require('./scripts/api');
var Utils = require('./scripts/utils');

$(function () { // document ready

  App.Router = new Router();
  Backbone.history.start({
    pushState: true,
    root: '/'
  });
  App.Router.navigate(location.pathname, true);

  App.API = Api;

  Utils.initializeGlobalHandlers();

});
