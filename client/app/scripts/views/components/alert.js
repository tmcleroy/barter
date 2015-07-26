var Alert = Backbone.View.extend({
  template: require('../../../templates/components/alert.ejs'),

  initialize: function (params) {
    this.$el = $('<div />').appendTo($('#alertContainer'));
    this.options = _.defaults(params || {}, {
      type: 'info',
      dismissable: true,
      delay: 5,
      body: '',
      classes: ''
    });
    this.render();

    setTimeout(() => {
      this.close();
    }, this.options.delay * 1000);
  },

  render: function () {
    this.$el.html(this.template(this.options));

    // handler must be set here, not in the events hash. I have no idea why
    this.$el.on('click', '.close', _.bind(this.close, this));
  },

  close: function () {
    this.$el.remove();
  }

});

export default Alert;
