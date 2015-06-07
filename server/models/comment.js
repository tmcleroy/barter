'use strict';

var utils = require('../utils');

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // a comment belongs to a single request
        Comment.belongsTo(models.Request, { through: 'CommentRequest' });
      }
    },
    instanceMethods: {
    }
  });
  return Comment;
};
