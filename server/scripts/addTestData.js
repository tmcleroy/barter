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
    _.each(modelDef.instances, function (def) {
      promises.push(model.create(def.attrs)
        .then(function (model) {
          myModels[modelName][def.name] = model;
        }));
    });
  });

  Sequelize.Promise.all(promises).then(function () {
     _.each(myModels.user, function (user) {
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
       body: 'I need a regex that validates an email address.',
       offer: 350
     }).then(function (request) {
       var promises = [];
       var comments = [];
       promises.push(request.setUser(myModels.user.jessica));
       promises.push(request.setTags([myModels.tag.regex]));
       // create the comments to be added to the request
       promises.push(models.Comment.create({
         body: 'What\'s your favorite planet?'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.tommy.addComment(comment);
       }));
       promises.push(models.Comment.create({
         body: 'What language?'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.jessica.addComment(comment);
       }));
       Sequelize.Promise.all(promises).then(function () {
         request.setComments(comments);
       });

       var proposalPromises = [];
       var proposals = [];
       // create the proposals to be added to the request
       proposalPromises.push(models.Proposal.create({
         body: 'I\'ll do it, but i need more points.',
         offer: 250
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.jim.addProposal(proposal);
       }));
       proposalPromises.push(models.Proposal.create({
         body: 'I know everything about this, And I\'ll do it for next to nothing.',
         offer: 100
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.tommy.addProposal(proposal);
       }));
       Sequelize.Promise.all(proposalPromises).then(function () {
         request.setProposals(proposals);
       });

     });

     models.Request.create({
       title: 'Sort by deeply nested property',
       body: 'I would like a javascript function that sorts an array of objects by a given property. The property may be deeply nested.',
       offer: 3050
     }).then(function (request) {
       var promises = [];
       var comments = [];
       promises.push(request.setUser(myModels.user.tommy));
       promises.push(request.setTags([myModels.tag.fxn, myModels.tag.algorithm]));
       // create the comments to be added to the request
       promises.push(models.Comment.create({
         body: 'Our business facilitates stand-ups to dynamically and globally align our proactive enterprise'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.jessica.addComment(comment);
       }));
       promises.push(models.Comment.create({
         body: 'We aim to conservatively invest our capability by iteratively relaying our world-class next-generation team players.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.laika.addComment(comment);
       }));
       Sequelize.Promise.all(promises).then(function () {
         request.setComments(comments);
       });
     });


     models.Request.create({
       title: 'In the future, will you be able to conservatively offshore?',
       body: 'capabilities in your business? Next-generation synergies are becoming value-added platform experts. In the market focus space, industry is dynamically aligning its wholesale emerging markets.',
       offer: 3500
     }).then(function (request) {
       var promises = [];
       var comments = [];
       promises.push(request.setUser(myModels.user.tommy));
       promises.push(request.setTags([myModels.tag.three, myModels.tag.fxn, myModels.tag.algorithm, myModels.tag.two]));
       // create the comments to be added to the request
       promises.push(models.Comment.create({
         body: 'Our business grows step-changes to proactively and ethically monetize our company-wide core competency.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.laika.addComment(comment);
       }));
       promises.push(models.Comment.create({
         body: 'So we can hit the ground running, we will be globally reusing every alignment in our space. Iteratively touching base about transforming clouds will make us leaders in the best-in-class team player industry. We use our knowledge transfer diversities to strategically manage our vertical expectations.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.jessica.addComment(comment);
       }));
       Sequelize.Promise.all(promises).then(function () {
         request.setComments(comments);
       });
     });


     models.Request.create({
       title: 'Change the way you do business - adopt senior brands.',
       body: 'Our alignment development lifecycle enables innovative, knowledge transfer team players. It\'s critical that we give 110% when strategically impacting step-changes. In the core asset space, industry is reliably aligning its wholesale stakeholders. Going forward, our world-class stack will deliver value to brands. In the future, will you be able to proactively facilitate architectures in your business? Key players will take ownership of their core competencies by virtually offshoring best-in-class low hanging fruit. Competitive capabilities are becoming seamless bandwidth experts. It\'s critical that we give 110% when ethically relaying innovations.',
       offer: 1500
     }).then(function (request) {
       var promises = [];
       var comments = [];
       promises.push(request.setUser(myModels.user.tommy));
       promises.push(request.setTags([myModels.tag.two, myModels.tag.fxn, myModels.tag.one, myModels.tag.algorithm]));
       // create the comments to be added to the request
       promises.push(models.Comment.create({
         body: 'Going forward, our proactive deliverable will deliver value to standard setters. Globally touching base about synergising executive searches will make us leaders in the senior capability industry. Change the way you do business - adopt holistic agile workflows.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.laika.addComment(comment);
       }));
       promises.push(models.Comment.create({
         body: 'It\'s critical that we give 110% when conservatively revolutionizing enterprises.'
       }).then(function (comment) {
         comments.push(comment);
         myModels.user.jessica.addComment(comment);
       }));
       Sequelize.Promise.all(promises).then(function () {
         request.setComments(comments);
       });
     });



   });

};

module.exports = fxn;
