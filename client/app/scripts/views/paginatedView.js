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

  fetch (updateUrl) {
    this.$el.addClass('loading');
    let opts = {
      sort: this.sort,
      limit: this.limit,
      cursor: this.cursor
    };
    if (this.mine) { opts.mine = true; }
    this.collection.fetch({
      data: opts
    });
    if (updateUrl) {
      this.updateUrl();
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

  updateUrl () {
    const options = {
      page: this.page,
      limit: this.limit,
      sort: this.sort
    };
    let split = window.location.pathname.split(/\//);
    // if there is a non-word character in the last segment (options are present)
    if (split[split.length - 1].match(/\W/)) {
      split.pop(); // pop off old options
    }
    App.Router.navigate(`${ split.join('/') }/${ JSON.stringify(options) }`);
  }

});

export default PaginatedView;
