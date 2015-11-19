const DEFAULT_PORT = 5000;

const environmentVariables = require('dotenv');
environmentVariables.load(); // define environment variables in the .env file

const argv = require('yargs').argv; // command line arguments
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer'); // for file uploads
const passport = require('passport'); // authentication
const models = require('./models');
const router = require('./routes');
const passportConfig = require('./config/passport');
const initializeTestData = require('./scripts/addTestData.js');
const bannerLogger = require('./helpers/bannerLogger.js');

const app = express();

app.set('port', (process.env.PORT || DEFAULT_PORT));
app.use(express.static(path.join(__dirname, '/public'))); // public dir
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'bartersecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({ dest: './server/uploads/' })); // temp foler for file uploads

app.set('view engine', 'ejs'); // use ejs templates
app.set('views', './server/templates/'); // set view template folder

router(app); // initialize router
passportConfig(passport); // initialize passport auth

// should reset db with test data? see server/scripts/addTestData.js
const resetData = argv['reload-data'] === 'true';

models.sequelize.sync({ force: resetData }).then(() => {

  if (resetData) {
    initializeTestData();
  }

  app.listen(app.get('port'), () => {
    bannerLogger(app);
  });
});
