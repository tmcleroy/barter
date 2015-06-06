window.$ = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');

$(function () { // document ready

  App.Router = new Router();
  Backbone.history.start({
    pushState: true,
    root: '/'
  });
  App.Router.navigate(location.pathname, true);

});
