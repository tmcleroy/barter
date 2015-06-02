var models = require('../models');
var args = process.argv.slice(2).map(function (arg) { return arg.replace(/\W/g, ''); });

var force = args.indexOf('wipe') > -1;

console.log('run with --wipe to clear all data in the db');

//                             set to true to overwrite db
models.sequelize.sync({ force: force }).then(function () {
  console.log('models synced');
  if (force) { console.log('data wiped'); }
});
