var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('it\'s up!');
});

app.listen(app.get('port'), function() {
  console.log('barter running on port', app.get('port'));
});
