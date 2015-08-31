import PaginationOptions from 'scripts/models/paginationOptionsModel';

const PaginatedView = Backbone.View.extend({

  events: {
    'change select[data-action]': 'selectChanged',
    'click a[data-page]': 'pageChanged'
  },

  initialize (params) {
    const page = params.page || 1;
    const limit = Math.min(params.limit || 10, params.maxLimit || 100);
    this.model = new PaginationOptions({
      page,
      limit,
      cursor: limit * (page - 1),
      sort: params.sort || '-createdAt',
      mine: !!params.mine
    });
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
      sort: this.model.get('sort'),
      limit: this.model.get('limit'),
      cursor: this.model.get('cursor')
    }, options || {});
    if (this.model.get('mine')) { opts.mine = true; }
    this.collection.fetch({
      data: opts
    });
    if (updateUrl) {
      this.updateUrl(opts);
    }
  },

  selectChanged (evt) {
    const $target = $(evt.target);
    const prop = $target.attr('data-action');
    let val = $target.val();
    // convert val to integer if it contains only digits
    val = val.match(/\D/) ? val : parseInt(val, 10);
    this.model.set(prop, val);
    if (prop === 'limit') {
      this.model.set('page', 1);
      this.model.updateCursor();
    }
    this.fetch(true);
  },

  pageChanged (evt) {
    evt.preventDefault();
    let val = $(evt.currentTarget).attr('data-page');
    const valInt = parseInt(val, 10);
    const page = _.isNaN(valInt) ? this.model.get('page') + { next: 1, prev: -1 }[val] : valInt;
    this.model.set('page', page);
    this.model.updateCursor();
    this.fetch(true);
  },

  updateUrl (options) {
    let split = window.location.pathname.split(/\//);
    // if there is a non-word character in the last segment (opts are present)
    if (split[split.length - 1].match(/\W/)) {
      split.pop(); // pop off old opts
    }
    App.Router.navigate(`${ split.join('/') }/${ JSON.stringify(options) }`);
  }

});

export default PaginatedView;
