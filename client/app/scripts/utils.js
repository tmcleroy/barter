const utils = {
  initializeGlobalHandlers () {
    $(document)
      // allows backbone to handle routing slash-based urls
      .on('click', 'a[href^="/"]', (evt) => {
        const href = $(evt.currentTarget).attr('href');
        const passThrough = href.match(/^logout$/); // let the server handle logout routing

        // allow shift+click for new tabs, etc.
        if (!passThrough && !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey) {
          evt.preventDefault();
          // remove leading slashes and hash bangs (backward compatablility)
          const url = href.replace(/^\//, '').replace('\#\!\/', '');
          // let backbone handle routing
          App.Router.navigate(url, true);
          return false;
        }
      })
      // show/hide collapsible containers. see collapsibleContainer.ejs
      .on('click', '[data-global-action="collapse"]', (evt) => {
        evt.preventDefault();
        const $target = $(evt.target);
        const $container = $target.siblings('.collapsibleContainer');
        const collapsed = $container.attr('data-collapsed') === 'true';
        const text = { show: $target.attr('data-showtext'), hide: $target.attr('data-hidetext') };
        $target.text(collapsed ? text.hide : text.show);
        $container.attr('data-collapsed', !collapsed);
      });
  }
};

export default utils;
