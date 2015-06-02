'use strict';
module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Permission.belongsToMany(models.User, {through: 'UserPermission'});
      }
    }
  });
  return Permission;
};
