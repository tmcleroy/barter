var TagsView = Backbone.View.extend({
  template: require('../../templates/tag/tags.ejs'),

  initialize: function (params) {
    this.editable = params.editable;

    this.listenTo(this.collection, 'sync change add', this.render);
    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      tags: this.collection,
      classes: this.editable ? 'editable' : ''
    }));
  }

});

module.exports = TagsView;
