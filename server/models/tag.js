'use strict';

var utils = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // a tag can belong to many requests
        Tag.belongsToMany(models.Request, { through: 'TagRequest' });
      }
    },
    instanceMethods: {
    }
  });
  return Tag;
};
