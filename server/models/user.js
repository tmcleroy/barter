'use strict';

var utils = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', utils.auth.getPasswordHash(val));
      }
    },
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Skill, { through: 'UserSkill' });
        User.belongsToMany(models.Permission, { through: 'UserPermission' });
      }
    },
    instanceMethods: {
      hasApiAccess: function(cb) {
        this.getPermissions().then(function (permissions) {
          var names = permissions.map(function(p) { return p.get('name'); });
          var access = names.indexOf('admin') > -1 || names.indexOf('api') > -1;
          cb(!!access);
        });
      },
      toClientJson: function() {
        return {
          username: this.get('username'),
          email: this.get('email')
        };
      }
    }
  });
  return User;
};
