var UserModel = Backbone.Model.extend({

  url: function () {
    return '/api/users/' + this.id;
  }
});

module.exports = UserModel;
