var models = require('../../models');

var handler = function (req, res) {
  models.User.findOne({ where: { id: req.params.id } })
    .then(function (user) { // user found
      if (!user) {
        res.status(404);
        res.send('user not found');
      } else {
        models.Skill.findOne({ where: { name: req.body.name } })
          .then(function (skill) { // skill found
            if (!skill) {
              res.status(404);
              res.send('skill not found');
            } else {
              user.removeSkill(skill).then(function () {
                console.log(skill.name + ' skill removed from ' + user.username);
                res.status(200);
                res.send('removed skill ' + skill.name);
              });
            }
          });
      }
    });
};

module.exports = handler;
