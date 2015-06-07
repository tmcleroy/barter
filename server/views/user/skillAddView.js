var models = require('../../models');

var handler = function (req, res) {
  models.User.findOne({ where: { id: req.params.id } })
    .then(function (user) { // user found
      if (!user) {
        res.status(404);
        res.send('user not found');
      } else {
        models.Skill.findOrCreate({ where: { name: req.body.name } })
          .spread(function (skill, created) { // skill found or created
            user.addSkill(skill).then(function () {
              console.log(skill.name + ' skill added to ' + user.username);
              res.status(200);
              res.send('added skill ' + skill.name);
            });
          });
      }
    });



};

module.exports = handler;
