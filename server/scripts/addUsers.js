var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');

var promises = [];
var userPermission, apiPermission, adminPermission;
var javascript, ruby, java, cpp, css;

module.exports = function () {


  // Permissions
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

  // Skills
  promises.push(models.Skill
  .create({
    name: 'javascript'
  }).then(function (model) {
    javascript = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'ruby'
  }).then(function (model) {
    ruby = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'java'
  }).then(function (model) {
    java = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'c++'
  }).then(function (model) {
    cpp = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'css'
  }).then(function (model) {
    css = model;
  }));

  Sequelize.Promise.all(promises).then(function () {
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

         // everyone is a user
         _.each(users, function (user) {
           user.addPermission(userPermission).then(function () { });
         });
         users[0].addPermission(adminPermission).then(function () { });
         users[0].addPermission(apiPermission).then(function () { });
         users[1].addPermission(apiPermission).then(function () { });
         // tommy has user and admin
         // jessica has user and api
         // laika has user

         // everyone knows javascript
         _.each(users, function (user) {
           user.addSkill(javascript).then(function () { });
         });
         users[0].addSkill(css).then(function () { });
         users[0].addSkill(cpp).then(function () { });
         users[0].addSkill(ruby).then(function () { });
         users[0].addSkill(java).then(function () { });
         users[1].addSkill(cpp).then(function () { });
         users[1].addSkill(css).then(function () { });
         users[2].addSkill(css).then(function () { });


      });
    });

  });

};
