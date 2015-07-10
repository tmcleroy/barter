var _ = require('lodash')._;
var models = require('../models');

// command line args
var resetData = process.argv[2] === 'reload-data';

//                             set to true to overwrite db
models.sequelize.sync({ force: resetData }).then(function () {

  if (resetData) {
    require('./scripts/addTestData.js')();
  }

  models.Transaction.findAll().then(function (transactions) {
    _.each(transactions, function (t) {
      console.log(t.id);
    });
    debugger;
  });

});
