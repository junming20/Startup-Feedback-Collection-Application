const express =  require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
// or just use require('./services/passport') instead of assigning
const passportConfig = require('./services/passport');

const authRoutes = require('./routes/authRoutes');
// moved to services/passport.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('./config/keys.js'); // can omit .js extention


mongoose.connect(keys.mongoURI);
const app = express();

// middleware, passed to req.body property in billingRoutes.js
app.use(bodyParser.json());

// middleware, proprocessing before sent to route handler
app.use(
  // document design choices of cookie session versus expression session!
  cookieSession({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// or a more fancy way:
// require('./routes/authRoutes')(app);
// require returns a function, and then immediately call this function with app object
authRoutes(app);

require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


//passport.use(new GoogleStrategy());

if (process.env.NODE_ENV === 'production'){
  // Express will serve up production assets
  // like our main.js file, or main.css profile
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if it does not recognize the route
  const path = require('path');

  // assumes that all previous attemps to match up the incoming request
  // with some actual resource has failed
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// console.developers.google.com
const PORT = process.env.PORT || 5000
app.listen(PORT);

// Passport js google authentication Oauth version 2.0
// https://github.com/jaredhanson/passport-google-oauth2
// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1072589238602-nrkjd1o8fr7k3lngo9fjv2v8eva4q5dm.apps.googleusercontent.com&flowName=GeneralOAuthFlow
