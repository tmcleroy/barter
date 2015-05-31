// 3rd party packages
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize'); // database ORM
var passport = require('passport'); // authentication

// app level requires
var models = require('./models');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public')); // public dir
app.use(bodyParser());
app.use(passport.initialize());

app.set('view engine', 'ejs'); // use ejs templates
app.set('views', './server/views/templates/'); // set view template folder


require('./config/passport')(passport); // pass passport for configuration
require('./routes')(app, passport); // initialize routes



models.sequelize.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log('barter server listening on port ' + app.get('port'));
  });
});
