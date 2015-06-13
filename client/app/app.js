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

  // global click handler that allows backbone to handle routing slash-based urls
  $(document).on('click', 'a[href^="/"]', (evt) => {

    var href = $(evt.currentTarget).attr('href');
    var passThrough = href.match(/^logout$/); // let the server handle logout routing

    // allow shift+click for new tabs, etc.
    if (!passThrough && !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey) {
      evt.preventDefault();
      // remove leading slashes and hash bangs (backward compatablility)
      var url = href.replace(/^\//,'').replace('\#\!\/','');
      // let backbone handle routing
      App.Router.navigate(url, { trigger: true });
      return false;
    }
  });

});
