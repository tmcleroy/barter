var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');

var promises = [];

var users = {};
var permissions = {};
var skills = {};
var tags = {};

var fxn = function () {

  // All the instances that can exist in a vacuum will be created
  // and added to the promises array

  // Users
  promises.push(models.User
  .create({
    username: 'tommy',
    password: 'tpass',
    email: 'tmcleroy@gmail.com'
  }).then(function (model) {
     users.tommy = model;
  }));

  promises.push(models.User
  .create({
    username: 'jessica',
    password: 'jpass',
    email: 'raf.rkl@gmail.com'
  }).then(function (model) {
     users.jessica = model;
  }));

  promises.push(models.User
  .create({
    username: 'laika',
    password: 'lpass',
    email: 'laika@gmail.com'
  }).then(function (model) {
     users.laika = model;
  }));

  // Permissions
  promises.push(models.Permission
  .create({
    name: 'user'
  }).then(function (permission) {
    permissions.user = permission;
  }));

  promises.push(models.Permission
  .create({
    name: 'api'
  }).then(function (permission) {
    permissions.api = permission;
  }));

  promises.push(models.Permission
  .create({
    name: 'admin'
  }).then(function (permission) {
    permissions.admin = permission;
  }));

  // Skills
  promises.push(models.Skill
  .create({
    name: 'javascript'
  }).then(function (model) {
    skills.js = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'ruby'
  }).then(function (model) {
    skills.ruby = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'java'
  }).then(function (model) {
    skills.java = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'c++'
  }).then(function (model) {
    skills.cpp = model;
  }));

  promises.push(models.Skill
  .create({
    name: 'css'
  }).then(function (model) {
    skills.css = model;
  }));

  // Tags
  promises.push(models.Tag
  .create({
    name: 'algorithm'
  }).then(function (model) {
    tags.algorithm = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'database query'
  }).then(function (model) {
    tags.query = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'regex'
  }).then(function (model) {
    tags.regex = model;
  }));

  promises.push(models.Tag
  .create({
    name: 'function'
  }).then(function (model) {
    tags.fxn = model;
  }));


  Sequelize.Promise.all(promises).then(function () {
     models.User.findAll().then(function(users) {
       console.log('users created');

       // everyone has the user permission
       _.each(users, function (user) {
         user.addPermission(permissions.user).then(function () { });
       });
       // everyone has the javascript skill
       _.each(users, function (user) {
         user.addSkill(skills.js).then(function () { });
       });
     });

     users.tommy.addPermission(permissions.admin).then(function () { });
     users.tommy.addPermission(permissions.api).then(function () { });
     users.jessica.addPermission(permissions.api).then(function () { });
     // users.tommy has user and admin
     // users.jessica has user and api
     // users.laika has user


     users.tommy.addSkill(skills.css).then(function () { });
     users.tommy.addSkill(skills.cpp).then(function () { });
     users.tommy.addSkill(skills.ruby).then(function () { });
     users.jessica.addSkill(skills.cpp).then(function () { });
     users.jessica.addSkill(skills.css).then(function () { });
     users.laika.addSkill(skills.css).then(function () { });

     // users now have permissions and skills

     // create some requests
     models.Request.create({
       title: 'Regex to validate email',
       body: 'I need a regex that validates an email address.'
     }).then(function (request) {
       var commentPromises = [];
       var comments = [];
       // add tags to the request
       request.setTags([tags.regex]).then(function () { });
       // create the comments to be added to the request
       commentPromises.push(models.Comment.create({
         body: 'Yo i\'ll do that shit'
       }).then(function (comment) {
         comments.push(comment);
         users.tommy.addComment(comment); // give the comment a user
       }));
       commentPromises.push(models.Comment.create({
         body: 'What language?'
       }).then(function (comment) {
         comments.push(comment);
         users.jessica.addComment(comment); // give the comment a user
       }));
       Sequelize.Promise.all(commentPromises).then(function () {
         request.setComments(comments);
       });
     });

     models.Request.create({
       title: 'Sort by deeply nested property',
       body: 'I would like a javascript function that sorts an array of objects by a given property. The property may be deeply nested.'
     }).then(function (request) {
       var commentPromises = [];
       var comments = [];
       // add tags to the request
       request.setTags([tags.fxn, tags.algorithm]).then(function () { });
       // create the comments to be added to the request
       commentPromises.push(models.Comment.create({
         body: 'Our business facilitates stand-ups to dynamically and globally align our proactive enterprise'
       }).then(function (comment) {
         comments.push(comment);
         users.tommy.addComment(comment); // give the comment a user
       }));
       commentPromises.push(models.Comment.create({
         body: 'We aim to conservatively invest our capability by iteratively relaying our world-class next-generation team players.'
       }).then(function (comment) {
         comments.push(comment);
         users.laika.addComment(comment); // give the comment a user
       }));
       Sequelize.Promise.all(commentPromises).then(function () {
         request.setComments(comments);
       });
     });


   });

};

module.exports = fxn;
