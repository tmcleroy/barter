var Moment = require('moment');

const UserModel = Backbone.Model.extend({
  getProfileUrl () {
    return '/api/users/' + this.id;
  },

  getJoinDateFormatted () {
    return Moment(this.get('createdAt')).format('ll');
  }
});

export default UserModel;
