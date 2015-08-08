const UserModel = Backbone.Model.extend({
  getProfileUrl () {
    return '/api/users/' + this.id;
  }
});

export default UserModel;
