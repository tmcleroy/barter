import template from 'templates/tag/tags.ejs';

const TagsView = Backbone.View.extend({
  template,
  events: {
    'click [data-action="remove"]': 'removeClicked',
    'click [data-action="remove-all"]': 'removeAllClicked'
  },

  initialize (params) {
    this.editable = params.editable || false;

    this.listenTo(this.collection, 'sync change add remove reset', this.render);
    this.render();
  },

  render () {
    this.$el.html(this.template({
      tags: this.collection,
      classes: this.editable ? 'editable' : '',
      editable: this.editable
    }));
  },

  removeClicked (evt) {
    const name = $(evt.target).closest('.tag').attr('data-name');
    this.collection.remove(this.collection.where({ name: name }));
  },

  removeAllClicked (evt) {
    evt.preventDefault();
    this.collection.reset();
  }

});

export default TagsView;
