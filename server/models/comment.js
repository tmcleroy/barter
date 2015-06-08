'use strict';

var utils = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // a comment belongs to a single request
        Comment.hasOne(models.Request);
        // a comment belongs to a single user
        Comment.hasOne(models.User);
      }
    },
    instanceMethods: {
    }
  });
  return Comment;
};
