const PaginatedView = Backbone.View.extend({

  events: {
    'change select[data-action]': 'selectChanged',
    'click a[data-page]': 'pageChanged'
  },

  initialize (params) {
    this.page = params.page || 1;
    this.limit = Math.min(params.limit || 10, params.maxLimit || 100);
    this.cursor = this.limit * (this.page - 1);
    this.sort = params.sort || '-createdAt';
  },

  // this is more of a post render function
  // actual render logic should be provided by the extending view,
  // then the extending view can call super. see requestsView.js for example
  render () {
    this.$el.removeClass('loading');
  },

  fetch (updateUrl, options) {
    this.$el.addClass('loading');
    let opts = _.extend({
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    }, options || {});
    if (this.mine) { opts.mine = true; }
    this.collection.fetch({
      data: opts
    });
    if (updateUrl) {
      this.updateUrl(opts);
    }
  },

  selectChanged (evt) {
    let $target = $(evt.target);
    let prop = $target.attr('data-action');
    let val = $target.val();
    // convert val to integer if it contains only digits
    val = val.match(/\D/) ? val : parseInt(val, 10);
    this[prop] = val;
    if (prop === 'limit') {
      this.page = 1;
      this.cursor = this.limit * (this.page - 1);
    }
    this.fetch(true);
  },

  pageChanged (evt) {
    evt.preventDefault();
    let val = $(evt.currentTarget).attr('data-page');
    if (_.isNaN(parseInt(val, 10))) { // prev or next
      this.page += { next: 1, prev: -1 }[val];
    } else { // numerical page
      this.page = parseInt(val, 10);
    }
    this.cursor = this.limit * (this.page - 1);
    this.fetch(true);
  },

  updateUrl (options) {
    console.log('updating url with options', options);
    let split = window.location.pathname.split(/\//);
    // if there is a non-word character in the last segment (opts are present)
    if (split[split.length - 1].match(/\W/)) {
      split.pop(); // pop off old opts
    }
    App.Router.navigate(`${ split.join('/') }/${ JSON.stringify(options) }`);
  }

});

export default PaginatedView;
