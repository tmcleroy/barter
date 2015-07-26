var TagsView = Backbone.View.extend({
  template: require('../../templates/tag/tags.ejs'),

  events: {
    'click .remove': 'removeClicked'
  },

  initialize: function (params) {
    this.editable = params.editable;

    this.listenTo(this.collection, 'sync change add remove', this.render);
    this.render();
  },

  render: function () {
    this.$el.html(this.template({
      tags: this.collection,
      classes: this.editable ? 'editable' : ''
    }));
  },

  removeClicked: function (evt) {
    var name = $(evt.target).closest('.tag').attr('data-name');
    this.collection.remove(this.collection.where({ name: name }));
  }

});

export default TagsView;
