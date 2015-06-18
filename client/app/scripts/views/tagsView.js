var TagsView = Backbone.View.extend({
  template: require('../../templates/tag/tags.ejs'),

  initialize: function (params) {
    this.render();

    this.listenTo(this.collection, 'sync change add', this.render);
  },

  render: function () {
    this.$el.html(this.template({
      tags: this.collection
    }));
  }

});

module.exports = TagsView;
