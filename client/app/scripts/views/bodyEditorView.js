import TabbedView from 'scripts/views/tabbedView';
import marked from 'marked';
import template from 'templates/bodyEditor.ejs';

const BodyEditorView = TabbedView.extend({
  template,
  initialize (params) {
    this.required = params.required;
    this.render();
  },

  render () {
    this.$el.html(this.template({
      required: this.required
    }));
  },

  tabChanged (action) {
    this.$('.actionContainer').addClass('hidden');
    this[action]();
  },

  toggleWrite () {
    this.$('.writeContainer').toggleClass('hidden');
  },

  togglePreview () {
    this.$('.previewContainer').toggleClass('hidden');
    const html = marked(this.$('[data-attr="body"]').val());
    this.$('.markdown').html(html);
  }
});

export default BodyEditorView;
