var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');

var promises = [];

var tommyUser, jessicaUser, laikaUser;
var userPermission, apiPermission, adminPermission;
var javascriptSkill, rubySkill, javaSkill, cppSkill, cssSkill;
var algorithmTag, queryTag, regexTag, fxnTag;

module.exports = function () {

  // All the instances that can exist in a vacuum will be created
  // and added to the promises array

  // Users
  promises.push(models.User
  .create({
    username: 'tommy',
    password: 'tpass',
    email: 'tmcleroy@gmail.com'
  }).then(function (model) {
     tommyUser = model;
  }));

  promises.push(models.User
  .create({
    username: 'jessica',
    password: 'jpass',
    email: 'raf.rkl@gmail.com'
  }).then(function (model) {
     jessicaUser = model;
  }));

  promises.push(models.User
  .create({
    username: 'laika',
    password: 'lpass',
    email: 'laika@gmail.com'
  }).then(function (model) {
     laikaUser = model;
  }));

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
    javascriptSkill = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'ruby'
  }).then(function (model) {
    rubySkill = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'java'
  }).then(function (model) {
    javaSkill = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'c++'
  }).then(function (model) {
    cppSkill = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'css'
  }).then(function (model) {
    cssSkill = model;
  }));

  // Tags
  promises.push(models.Tag
  .create({
    name: 'algorithm'
  }).then(function (model) {
    algorithmTag = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'database query'
  }).then(function (model) {
    queryTag = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'regex'
  }).then(function (model) {
    regexTag = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'function'
  }).then(function (model) {
    functionTag = model;
  }));


  Sequelize.Promise.all(promises).then(function () {
     models.User.findAll().then(function(users) {
       console.log('users created');

       // everyone has the user permission
       _.each(users, function (user) {
         user.addPermission(userPermission).then(function () { });
       });
       // everyone has the javascript skill
       _.each(users, function (user) {
         user.addSkill(javascriptSkill).then(function () { });
       });
     });

     tommyUser.addPermission(adminPermission).then(function () { });
     tommyUser.addPermission(apiPermission).then(function () { });
     jessicaUser.addPermission(apiPermission).then(function () { });
     // tommyUser has user and admin
     // jessicaUser has user and api
     // laikaUser has user


     tommyUser.addSkill(cssSkill).then(function () { });
     tommyUser.addSkill(cppSkill).then(function () { });
     tommyUser.addSkill(rubySkill).then(function () { });
     jessicaUser.addSkill(cppSkill).then(function () { });
     jessicaUser.addSkill(cssSkill).then(function () { });
     laikaUser.addSkill(cssSkill).then(function () { });

     // users now have permissions and skills
     models.Request.create({
       title: 'Regex to validate email',
       body: 'I need a regex that validates an email address.'
     }).then(function (request) {
       request.addTag(regexTag).then(function () { });
     });

  });

};
