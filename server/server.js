// 3rd party packages
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var Sequelize = require('sequelize'); // database ORM
var passport = require('passport'); // authentication

// app level requires
var models = require('./models');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public')); // public dir
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'bartersecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs'); // use ejs templates
app.set('views', './server/views/templates/'); // set view template folder

require('./config/passport')(passport); // pass passport for configuration
require('./routes')(app); // initialize routes

//                             set to true to overwrite db
models.sequelize.sync({ force: true }).then(function () {

  require('./scripts/addTestData.js')();

  app.listen(app.get('port'), function() {
    console.log('barter server listening on port ' + app.get('port'));
  });
});
