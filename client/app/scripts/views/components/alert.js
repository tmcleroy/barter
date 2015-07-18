var Alert = Backbone.View.extend({
  template: require('../../../templates/components/alert.ejs'),

  events: {
    'click .close': 'close'
  },

  initialize: function (params) {
    this.$el = $('<div class="modalContainer"/>').prependTo($('body'));
    this.options = _.defaults(params || {}, {
      type: 'info',
      dismissable: true,
      delay: 5,
      body: '',
      classes: ''
    });
    this.render();

    // setTimeout(() => {
    //   this.close();
    // }, this.options.delay * 1000);
  },

  render: function () {
    this.$el.html(this.template(this.options));
  },

  close: function () {
    console.log('closin');
    this.$el.empty();
  }

});

module.exports = Alert;
