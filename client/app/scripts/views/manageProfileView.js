import TabbedView from 'scripts/views/tabbedView';
import EditProfileView from 'scripts/views/editProfileView';
import SettingsView from 'scripts/views/settingsView';
import template from 'templates/profile/manageProfile.ejs';

const ManageProfileView = TabbedView.extend({
  template,
  views: {},
  initialize (params) {
    // set `this.views` in the constructor so separate instances don't share the value
    // see https://github.com/jashkenas/backbone/issues/1237 or http://stackoverflow.com/a/18327395/1669307
    this.views = {};
    this.render();
    _.defer(() => { this.$('[data-action="toggleEditProfile"]').click(); });
  },

  render () {
    this.$el.html(this.template({
      user: this.model
    }));
  },

  tabChanged (action) {
    this.$('.actionContainer').addClass('hidden');
    this[action]();
  },

  toggleEditProfile () {
    this.$('.editProfileContainer').toggleClass('hidden');
    if (!this.views.editProfileView) {
      this.views.editProfileView = new EditProfileView({
        el: this.$('.editProfileContainer'),
        model: this.model
      });
    }
  },

  toggleSettings () {
    this.$('.settingsContainer').toggleClass('hidden');
    if (!this.views.settingsContainer) {
      this.views.settingsContainer = new SettingsView({
        el: this.$('.settingsContainer'),
        model: this.model
      });
    }
  },

  remove () {
    _.invoke(this.views, 'remove');
    this.views = null;
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

export default ManageProfileView;
