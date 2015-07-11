var utils = {
  initializeGlobalHandlers: function () {
    $(document)
      // allows backbone to handle routing slash-based urls
      .on('click', 'a[href^="/"]', (evt) => {
        var href = $(evt.currentTarget).attr('href');
        var passThrough = href.match(/^logout$/); // let the server handle logout routing

        // allow shift+click for new tabs, etc.
        if (!passThrough && !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey) {
          evt.preventDefault();
          // remove leading slashes and hash bangs (backward compatablility)
          var url = href.replace(/^\//, '').replace('\#\!\/', '');
          // let backbone handle routing
          App.Router.navigate(url, true);
          return false;
        }
      })
      // show/hide collapsible containers. see collapsibleContainer.ejs
      .on('click', '[data-global-action="collapse"]', (evt) => {
        evt.preventDefault();
        var $target = $(evt.target);
        var $container = $target.next('.collapsibleContainer');
        var collapsed = $container.attr('data-collapsed') === 'true';
        var text = { show: $target.attr('data-showtext'), hide: $target.attr('data-hidetext') };
        $target.text(collapsed ? text.hide : text.show);
        $container.attr('data-collapsed', !collapsed);
      });

  }
};

module.exports = utils;
