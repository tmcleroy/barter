var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');

var defs = require('./dataDefs');

var promises = [];
var myModels = {
  user: {},
  permission: {},
  skill: {},
  tag: {}
};

var fxn = function () {

  // All the instances that can exist in a vacuum will be created
  // and added to the promises array

  _.each(defs, function (modelDef) {
    var model = modelDef.model;
    var modelName = modelDef.name;
    console.log(myModels);
    console.log(modelName);
    _.each(modelDef.instances, function (def) {
      promises.push(model.create(def.attrs)
        .then(function (model) {
          myModels[modelName][def.name] = model;
        }));
    });
  });

  Sequelize.Promise.all(promises).then(function () {
     _.each(myModels.user, function(user) {
       user.addPermission(myModels.permission.user).then(function () { });
       user.addSkill(myModels.skill.js).then(function () { });
     });

     myModels.user.tommy.addPermission(myModels.permission.admin).then(function () { });
     myModels.user.tommy.addPermission(myModels.permission.api).then(function () { });
     myModels.user.jessica.addPermission(myModels.permission.api).then(function () { });

     myModels.user.tommy.addSkill(myModels.skill.css).then(function () { });
     myModels.user.tommy.addSkill(myModels.skill.cpp).then(function () { });
     myModels.user.tommy.addSkill(myModels.skill.ruby).then(function () { });
     myModels.user.jessica.addSkill(myModels.skill.cpp).then(function () { });
     myModels.user.jessica.addSkill(myModels.skill.css).then(function () { });
     myModels.user.laika.addSkill(myModels.skill.css).then(function () { });

     // users now have permissions and skills

     // create some requests
     models.Request.create({
       title: 'Regex to validate email',
       body: 'I need a regex that validates an email address.'
     }).then(function (request) {
       request.setUser(myModels.user.jessica);
       var commentPromises = [];
       var comments = [];
       // add tags to the request
       request.setTags([myModels.tag.regex]).then(function () { });
       // create the comments to be added to the request
       commentPromises.push(models.Comment.create({
         body: 'Yo i\'ll do that shit'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.tommy.addComment(comment); // give the comment a user
       }));
       commentPromises.push(models.Comment.create({
         body: 'What language?'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.jessica.addComment(comment); // give the comment a user
       }));
       Sequelize.Promise.all(commentPromises).then(function () {
         request.setComments(comments);
       });
     });

     models.Request.create({
       title: 'Sort by deeply nested property',
       body: 'I would like a javascript function that sorts an array of objects by a given property. The property may be deeply nested.'
     }).then(function (request) {
       request.setUser(myModels.user.tommy);
       var commentPromises = [];
       var comments = [];
       // add tags to the request
       request.setTags([myModels.tag.fxn, myModels.tag.algorithm]).then(function () { });
       // create the comments to be added to the request
       commentPromises.push(models.Comment.create({
         body: 'Our business facilitates stand-ups to dynamically and globally align our proactive enterprise'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.tommy.addComment(comment); // give the comment a user
       }));
       commentPromises.push(models.Comment.create({
         body: 'We aim to conservatively invest our capability by iteratively relaying our world-class next-generation team players.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.laika.addComment(comment); // give the comment a user
       }));
       Sequelize.Promise.all(commentPromises).then(function () {
         request.setComments(comments);
       });
     });


   });

};

module.exports = fxn;
