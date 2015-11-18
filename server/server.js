require('dotenv').load(); // environment constiables in .env
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer'); // for file uploads
const session = require('express-session');
const passport = require('passport'); // authentication
const models = require('./models');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/public'))); // public dir
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'bartersecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({ dest: './server/uploads/' })); // temp foler for file uploads

app.set('view engine', 'ejs'); // use ejs templates
app.set('views', './server/templates/'); // set view template folder

require('./config/passport')(passport); // pass passport for configuration
require('./routes')(app); // initialize routes

// command line args
const resetData = process.argv[2] === 'reload-data';

models.sequelize.sync({ force: resetData }).then(() => {

  if (resetData) {
    require('./scripts/addTestData.js')();
  }

  app.listen(app.get('port'), () => {
    console.log(`server running in ${process.env.NODE_ENV}, listening on port ${app.get('port')}`);
  });
});
