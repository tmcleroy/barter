var utils = require('../utils/utils');
var ssaclAttributeRoles = require('ssacl-attribute-roles');

var AVATAR_DIR = 'https://s3-us-west-2.amazonaws.com/barter.app/public/avatars/';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {});
  ssaclAttributeRoles(sequelize);
  ssaclAttributeRoles(User);

  User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function (val) {
        this.setDataValue('password', utils.auth.getPasswordHash(val));
      },
      // so we don't expose even the hashed password.
      // I don't trust ssaclAttributeRoles 100%
      get: function () { return null; },
      // should prevent this field from being accessed unless explicitly requested
      // https://github.com/mickhansen/ssacl-attribute-roles
      roles: false
    },
    email: {
      type: DataTypes.STRING,
      // email can can only be accessed if you explicitly pass the admin role user.get({role: 'admin'});
      roles: {
        admin: { get: true },
        self: true
      }
    },
    rep: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 10000
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: function () { return AVATAR_DIR + 'avatar-default-' + (Math.floor(Math.random() * 10) + 1) + '.png'; },
      set: function () { // don't allow direct setting of this, it should always be based on the id
        var id = this.get('id') || 'default';
        this.setDataValue('avatar', AVATAR_DIR + 'avatar-' + id + '.png');
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // a user can have many requests
        // User.belongsToMany(models.Request, { through: 'UserRequest' });
        User.hasMany(models.Request);
        // a user can have many skills, a skill can belong to many users
        User.belongsToMany(models.Skill, { through: 'UserSkill' });
        // a user can have many permissions, a permission can belong to many users
        User.belongsToMany(models.Permission, { through: 'UserPermission' });
        // a user can have many comments, a comment can belong to a single user
        User.hasMany(models.Comment);
        // a user can have many proposals, a proposal can belong to a single user
        User.hasMany(models.Proposal);
        // a user can have many submissions, a submission can belong to a single user
        User.hasMany(models.Submission);
        // a user can belong to (subscribe to) many tags (to get notifications when a request with that tag is created)
        // a tag can belong to many users (be subscribed to by many users)
        User.belongsToMany(models.Tag, { through: 'SubscribedTags' });
      }
    },
    instanceMethods: {
      hasAdminAccess: function (cb) {
        this.getPermissions().then(function (permissions) {
          var names = permissions.map(function (p) { return p.get('name'); });
          var access = names.indexOf('admin') > -1;
          cb(!!access);
        });
      },
      hasApiAccess: function (cb) {
        this.getPermissions().then(function (permissions) {
          var names = permissions.map(function (p) { return p.get('name'); });
          var access = names.indexOf('admin') > -1 || names.indexOf('api') > -1;
          cb(!!access);
        });
      }
    }
  });
  return User;
};
