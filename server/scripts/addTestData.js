var Sequelize = require('sequelize');
var models = require('../models');
var _ = require('lodash');
var faker = require('faker');
var moment = require('moment');
var defs = require('./dataDefs');

var promises = [];
var myModels = {
  user: {},
  permission: {},
  skill: {},
  tags: [],
  comments: [],
  proposals: [],
  requests: []
};


// helper funcs to get random stuff
function randInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randRoundInt (min, max) {
  var int = randInt(min, max);
  return int - (int % 50);
}

function randFromObj (obj) {
  var keys = _.keys(obj);
  var index = randInt(0, (keys.length - 1));
  var key = keys[index];
  return obj[key];
}

function randArrFromArr (all, min, max) {
  var ret = [];
  _.times(randInt(min, max), function () {
    ret.push(all[randInt(0, all.length - 1)]);
  });
  return ret;
}

function randTags (allTags, min, max) {
  return randArrFromArr(allTags, min || 0, max || 5);
}

function randComments (allComments) {
  return randArrFromArr(allComments, 0, 10);
}

function randProposals (allProposals) {
  return randArrFromArr(allProposals, 5, 10);
}

function randDate () {
  // format to match: 2015-07-11T23:30:46.092Z
  // from now to 6 months ago
  return moment().subtract(randInt(0, 262974), 'minutes').format();
}

var fxn = function () {

  // predifined entities from dataDefs.js
  _.each(defs, function (modelDef) { // predefined entities, see dataDefs.js
    var model = modelDef.model;
    var modelName = modelDef.name;
    _.each(modelDef.instances, function (def) {
      promises.push(model.create(def.attrs)
        .then(function (model) {
          myModels[modelName][def.name] = model;
        }));
    });
  });

  _.times(randInt(10, 30), function (i) { // add random users to the already defined ones in datatDefs.js
    promises.push(models.User.create({
      username: faker.internet.userName(),
      password: 'password', // so i can easily log in as any of these test users
      email: faker.internet.email(),
      rep: randInt(0, 10000)
    }).then(function (model) {
      myModels.user['random' + i] = model;
    }));
  });

  _.times(randInt(150, 250), function (i) { // random tags
    var methods = ['abbreviation', 'adjective', 'noun', 'verb', 'ingverb'];
    var index = randInt(0, methods.length - 1);
    promises.push(models.Tag.create({ name: faker.hacker[methods[index]]() }).then(function (model) {
      myModels.tags.push(model);
    }));
  });

  _.times(randInt(150, 250), function (i) { // random comments
    promises.push(models.Comment.create({ body: faker.lorem.paragraph() }).then(function (model) {
      myModels.comments.push(model);
    }));
  });

  _.times(randInt(150, 250), function (i) { // random proposals
    promises.push(models.Proposal.create({
      body: faker.lorem.paragraph(),
      offer: randInt(50, 15000)
    }).then(function (model) {
      myModels.proposals.push(model);
    }));
  });

  Sequelize.Promise.all(promises).then(function () { // initial entities created above are done
    // assign permisisons
    _.each(myModels.user, function (user) {
      user.addPermission(myModels.permission.user);
    });
    myModels.user.tommy.addPermission(myModels.permission.admin);
    myModels.user.tommy.addPermission(myModels.permission.api);
    myModels.user.jessica.addPermission(myModels.permission.api);

    // assign a random user to each comment
    _.each(myModels.comments, function (comment) {
      randFromObj(myModels.user).addComment(comment);
    });

    // // assign a random user and value to each proposal
    // _.each(myModels.proposals, function (model) {
    //   randFromObj(myModels.user).addProposal(model);
    // });

    _.times(randInt(100, 150), function (i) { // random requests
       models.Request.create({
         title: faker.hacker.phrase(),
         body: faker.lorem.paragraphs(randInt(1, 4)),
         offer: randRoundInt(100, 10000),
         createdAt: randDate()
       }).then(function (request) {
         myModels.requests.push(request);
         request.setUser(randFromObj(myModels.user)).then(function (model) {
           request.setTags(randTags(myModels.tags)).then(function (model) {
             request.setComments(randComments(myModels.comments)).then(function (model) {
               var proposals = randProposals(myModels.proposals);
               request.setProposals(proposals).then(function (model) {
                 // give each proposal a user
                 _.each(proposals, function (proposal) {
                   randFromObj(myModels.user).addProposal(proposal);
                 });
                 // 33% chance of accepting one proposal
                 if (proposals.length && randInt(0, 100) % 3 === 0) {
                   proposals[0].set('state', 1).save();
                 }
               });
             });
           });
         });

       });
     });

     // create some requests
     setTimeout(function () {
       models.Request.create({
         title: 'Function to generate delta compression',
         body: "Any work done on frame to frame delta compression of GPU command streams for remote applications? Don\'t concat view matrix, lots unchanged. Disregarding energy, I wonder how far you could push a thermal optimized design on a standalone headset before it limited comfort. 40W?.\r\n\r\n" +
         "### Requirements\r\n" +
         "- zlib buffer overloading\r\n" +
         "- isomorphic vscale compression\r\n" +
         "- triple cached matrices\r\n\r\n" +
         "The isotropic directional nature of primitive processes is unfortunate -- I want photon control for VR and molecular control for propulsion.\r\n\r\n\r\n" +
         "##### Here is what I have so far\r\n\r\n" +
         "```\r\n" +
         "#include <stdio.h>\r\n" +
        "  \r\n" +
         "main()\r\n" +
         "{\r\n" +
        "    int n, c;\r\n" +
        "  \r\n" +
        "    if ( n == 2 )\r\n" +
        "       # I can't figure out what to do here\r\n" +
        "    return 0;\r\n" +
         "}\r\n" +
         "```\r\n",
         offer: 600
       }).then(function (request) {
         var promises = [];
         var comments = [];

         promises.push(request.setUser(myModels.user.john));
         promises.push(request.setTags(randTags(myModels.tags, 3, 10)));
         // create the comments to be added to the request
         promises.push(models.Comment.create({
           body: 'John, I think you should specify that this task needs to be fulfilled on a computer that uses only free software.'
         }).then(function (comment) {
           comments.push(comment);
           myModels.user.richard.addComment(comment);
         }));
         promises.push(models.Comment.create({
           body: 'Is this just text copied and pasted from your twitter feed?'
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
           body: 'I have 20 years of experience buffering the z-sectors of polygonally fragmented texture matrices. I will perform this task in a timely manner for the exact price you have offered. Thank you for your consideration John.',
           offer: 600
         }).then(function (proposal) {
           proposals.push(proposal);
           myModels.user.jessica.addProposal(proposal);
         }));
         proposalPromises.push(models.Proposal.create({
           body: 'I love you john, but i\'m going to need more points for this.',
           offer: 900,
           state: -1
         }).then(function (proposal) {
           proposals.push(proposal);
           myModels.user.jim.addProposal(proposal);
         }));
         proposalPromises.push(models.Proposal.create({
           body: 'John!!!, I\'m such a big fan, I\'ll do this for less than you asked.',
           offer: 500,
           state: -1
         }).then(function (proposal) {
           proposals.push(proposal);
           myModels.user.laika.addProposal(proposal);
         }));
         proposalPromises.push(models.Proposal.create({
           body: 'I know everything about this, And I\'ll do it for next to nothing.',
           offer: 300
         }).then(function (proposal) {
           proposals.push(proposal);
           myModels.user.tommy.addProposal(proposal);
         }));
         Sequelize.Promise.all(proposalPromises).then(function () {
           request.setProposals(proposals);
         });
       });







       models.Request.create({
         title: 'Javascript build system that is 100% free software',
         body: "In recent months I have taken a liking to javascript. However, none of the most popular build systems (grunt, gulp, webpack etc.) meet my strict requirements.\r\n\r\n" +

         "Now you may find yourself saying, \"But Richard, all of those projects are open source\". While that may be true, I have recently decided that I will not use any software that doesn't meet these criteria ...\r\n\r\n\r\n" +


         "- Developed exclusively on systems that are 100% FREE\r\n" +
        "  - yes that includes bootloaders, drivers, and even hardware schematics!!!\r\n" +
         "- The project page must not use any CSS\r\n" +
        "  - see [my homepage](https://stallman.org/) for a great example\r\n" +
         "- Each contributor must ...\r\n" +
        "  - be a card-carrying member of the green party\r\n" +
        "  - own a signed copy of _The Lifelong Activist_\r\n\r\n" +

         "Phew! that was exhausting formatting this request with markdown, far too much styling for my tastes.",
         offer: 4500
       }).then(function (request) {
         var promises = [];
         var comments = [];

         promises.push(request.setUser(myModels.user.richard));
         promises.push(request.setTags(randTags(myModels.tags, 3, 10)));
         // create the comments to be added to the request
         promises.push(models.Comment.create({
           body: 'Richard, I think you may need to loosen your constraints a little bit. It\'s almost impossible to acquire a computer with 100% free software, let alone hardware schematics'
         }).then(function (comment) {
           comments.push(comment);
           myModels.user.john.addComment(comment);
         }));
         promises.push(models.Comment.create({
           body: 'Amen brother! FREE KEVIN!'
         }).then(function (comment) {
           comments.push(comment);
           myModels.user.jim.addComment(comment);
         }));
         promises.push(models.Comment.create({
           body: 'What do you have against CSS richard? It\'s FOSS isn\'t it?'
         }).then(function (comment) {
           comments.push(comment);
           myModels.user.laika.addComment(comment);
         }));
         Sequelize.Promise.all(promises).then(function () {
           request.setComments(comments);
         });

         var proposalPromises = [];
         var proposals = [];
         // create the proposals to be added to the request
         proposalPromises.push(models.Proposal.create({
           body: 'Rich, I\'ll do this for you because I consider you a good friend and I\'d like to accomplish something that more than 1% of the software development community can understand. I\'ll need 5000 though, that\'s my starting rate :)',
           offer: 5000,
           state: 1
         }).then(function (proposal) {
           proposals.push(proposal);
           myModels.user.john.addProposal(proposal);
         }));
         Sequelize.Promise.all(proposalPromises).then(function () {
           request.setProposals(proposals);
         });
       });
     }, 500);

     models.Request.create({
       title: 'Regex to validate email',
       body: 'I need a regex that validates an email address.',
       offer: 350
     }).then(function (request) {
       var promises = [];
       var comments = [];

       promises.push(request.setUser(myModels.user.jessica));
       promises.push(request.setTags(randTags(myModels.tags)));
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
         body: 'This is my proposal blah blabh blah blah. Is your platform prepared for best-of-breed synergy growth? Efficiencies will come from strategically connecting our architectures. Change the way you do business - adopt best-in-class drivers.',
         offer: 2500
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.laika.addProposal(proposal);
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
       promises.push(request.setTags(randTags(myModels.tags)));
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
       promises.push(request.setTags(randTags(myModels.tags)));
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

       var proposalPromises = [];
       var proposals = [];
       // create the proposals to be added to the request
       proposalPromises.push(models.Proposal.create({
         body: 'i can do itttttt',
         offer: 2590
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.jim.addProposal(proposal);
       }));
       proposalPromises.push(models.Proposal.create({
         body: 'Is your platform prepared for best-of-breed synergy growth? Efficiencies will come from strategically connecting our architectures. Change the way you do business - adopt best-in-class drivers.',
         offer: 2500,
         state: 1
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.jessica.addProposal(proposal);
       }));
       proposalPromises.push(models.Proposal.create({
         body: 'I know stuff',
         offer: 1000,
         state: -1
       }).then(function (proposal) {
         proposals.push(proposal);
         myModels.user.laika.addProposal(proposal);
       }));
       Sequelize.Promise.all(proposalPromises).then(function () {
         request.setProposals(proposals);
       });
     });



  });

};

module.exports = fxn;
