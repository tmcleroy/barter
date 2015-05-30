var express = require('express');
var Sequelize = require('sequelize');
var models = require('./models');

var app = express();

require('./routes')(app); // initialize routes

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './server/views/templates/');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

models.sequelize.sync().then(function () {
  app.listen(app.get('port'), function() {
    console.log('barter server listening on port ' + app.get('port'));
  });
});
