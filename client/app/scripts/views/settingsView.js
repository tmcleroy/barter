import TagsEditorView from 'scripts/views/tagsEditorView';
import TagsCollection from 'scripts/collections/tagsCollection';
import template from 'templates/settings.ejs';

const SettingsView = Backbone.View.extend({
  template,
  initialize (params) {
    // this.render();
    App.user.fetchSubscriptions().done((data) => {
      this.subscriptions = new TagsCollection(data);
      this.render();
    });
  },

  render () {
    console.log('subs', this.subscriptions);
    this.$el.html(this.template({
      user: this.model
    }));
    new TagsEditorView({
      collection: this.subscriptions,
      el: this.$('.tagsEditorContainer')
    });
  }
});

export default SettingsView;
