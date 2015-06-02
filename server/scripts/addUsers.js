var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');

var promises = [];
var userPermission, apiPermission, adminPermission;

module.exports = function () {

  promises.push(models.Permission
    .create({
      name: 'user'
    }).then(function (permission) {
      userPermission = permission;
    }));

  promises.push(models.Permission
    .create({
      name: 'api'
    }).then(function (permission) {
      // console.log(permission);
      apiPermission = permission;
    }));

  promises.push(models.Permission
    .create({
      name: 'admin'
    }).then(function (permission) {
      // console.log(permission);
      adminPermission = permission;
    }));

  Sequelize.Promise.all(promises).then(function () {
    console.log('permissions created');

    models.User.bulkCreate([
      {
        username: 'tommy',
        password: 'tpass',
        email: 'tmcleroy@gmail.com'
      },
      {
        username: 'jessica',
        password: 'jpass',
        email: 'raf.rkl@gmail.com'
      },
      {
        username: 'laika',
        password: 'lpass',
        email: 'laika@gmail.com'
      }
    ]).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
       models.User.findAll().then(function(users) {
         console.log('users created');

         _.each(users, function (user) {
           user.addPermission(userPermission).then(function () { });
         });

         users[0].addPermission(adminPermission).then(function () { });
         users[0].addPermission(apiPermission).then(function () { });
         users[1].addPermission(adminPermission).then(function () { });

      });
    });

  });

};
