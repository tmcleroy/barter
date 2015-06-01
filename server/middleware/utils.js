var bcrypt = require('bcrypt');

var utils = {
  saltAndHashPassword: function (password) {
    var saltWorkFactor = 10;
    var salt = bcrypt.genSaltSync(saltWorkFactor);
    var hash = bcrypt.hashSync(password, salt);
    var saltAndHash = {
      salt: salt,
      hash: hash
    };

    var isMatch = bcrypt.compareSync(password, hash);
    return (isMatch ? saltAndHash : null);
  }
};

module.exports = utils;
