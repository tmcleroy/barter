var bcrypt = require('bcrypt');

function passwordAndHashMatch (password, hash) {
  return bcrypt.compareSync(password, hash);
}

var utils = {
  auth: {
    getPasswordHash: function (password) {
      var saltWorkFactor = 10;
      var salt = bcrypt.genSaltSync(saltWorkFactor);
      var hash = bcrypt.hashSync(password, salt);

      var isMatch = passwordAndHashMatch(password, hash);
      return (isMatch ? hash : null);
    },

    passwordAndHashMatch: passwordAndHashMatch
  }
};

module.exports = utils;
