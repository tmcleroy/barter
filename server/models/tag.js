'use strict';

var utils = require('../utils/utils');

module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // a tag can belong to many requests
        Tag.belongsToMany(models.Request, { through: 'TagRequest' });
        Tag.belongsToMany(models.User, { through: 'SubscribedUsers' });
      }
    },
    instanceMethods: {
    }
  });
  return Tag;
};
