'use strict';

var utils = require('../utils');
var ssaclAttributeRoles = require('ssacl-attribute-roles');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {});
  ssaclAttributeRoles(sequelize);
  ssaclAttributeRoles(User);

  User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', utils.auth.getPasswordHash(val));
      },
      // so we don't expose even the hashed password.
      // I don't trust ssaclAttributeRoles 100%
      get: function () { return null; },
      // should prevent this field from being accessed unless explicitly requested
      // https://github.com/mickhansen/ssacl-attribute-roles
      roles: false
    },
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // a user can have many skills, a skill can belong to many users
        User.belongsToMany(models.Skill, { through: 'UserSkill' });
        // a user can have many permissions, a permission can belong to many users
        User.belongsToMany(models.Permission, { through: 'UserPermission' });
        // a user can have many comments, a comment can belong to a single user
        User.hasMany(models.Comment);
      }
    },
    instanceMethods: {
      hasAdminAccess: function(cb) {
        this.getPermissions().then(function (permissions) {
          var names = permissions.map(function(p) { return p.get('name'); });
          var access = names.indexOf('admin') > -1;
          cb(!!access);
        });
      },
      hasApiAccess: function(cb) {
        this.getPermissions().then(function (permissions) {
          var names = permissions.map(function(p) { return p.get('name'); });
          var access = names.indexOf('admin') > -1 || names.indexOf('api') > -1;
          cb(!!access);
        });
      },
      toClientJSON: function() {
        return {
          id: this.get('id'),
          username: this.get('username'),
          email: this.get('email')
        };
      }
    }
  });
  return User;
};
