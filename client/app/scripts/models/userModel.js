import Moment from 'moment';

const UserModel = Backbone.Model.extend({
  urlRoot: '/api/users',

  getProfileUrl () {
    // TODO implement public facing profile view
    return 'www.fake.com';
  },

  getJoinDateFormatted () {
    return Moment(this.get('createdAt')).format('ll');
  },

  getUsername () {
    const providerIcon = this.get('provider') === 'native' ? '' : `<i class="barter-icon-${this.get('provider')}"></i>`;
    return `<span class="username">${this.get('username')}${providerIcon}</span>`;
  },

  getUsernameLink () {
    return `<a href="/users/${this.get('id')}" class="usernameLink">${this.getUsername()}</a>`;
  },

  fetchSubscriptions () {
    return $.ajax({
      url: `${ this.urlRoot }/${ this.get('id') }/subscriptions`,
      method: 'GET'
    });
  },

  setSubscriptions (tags) {
    return $.ajax({
      url: `${ this.urlRoot }/${ this.get('id') }/subscriptions`,
      method: 'POST',
      data: {
        tags: tags
      }
    });
  }
});

export default UserModel;
