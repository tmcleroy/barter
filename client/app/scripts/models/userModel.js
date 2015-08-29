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
