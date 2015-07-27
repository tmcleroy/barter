module.exports = function (sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    amount: DataTypes.INTEGER,
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER
  }, {
    classMethods: {
    },
    instanceMethods: {
    }
  });
  return Transaction;
};
