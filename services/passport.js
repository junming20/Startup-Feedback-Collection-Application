const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
// go up to the server folder using ..
const keys = require('../config/keys.js'); // can omit .js extention
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID : keys.googleClientID,
//       clientSecret : keys.googleClientSecret,
//       callbackURL : '/auth/google/callback'
//     },
//     (accessToken) => {
//       console.log(accessToken);
//     }
//   )
// );

// not a route handler
// setting up Passport, which is a service
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID : keys.googleClientID,
//       clientSecret : keys.googleClientSecret,
//       callbackURL : '/auth/google/callback'
//     },
//     (accessToken, refreshToken,profile, done) => {
//       console.log('accessToken:', accessToken);
//       console.log('refreshToken:', refreshToken);
//       console.log('profile:', profile);
//     }
//   )
// );

// understanding of callback function done
// https://stackoverflow.com/questions/56553599/what-is-done-callback-function-in-node-js
passport.serializeUser((user, done) => {
  // this is not profile
  // this id refers to the mongodb ID, not profile.id
  // can not assume this user has a googleID because the user might
  // sign in with Facebook, LinkedIn, etc.
  // OAuth's sole purpose is to allow someone to sign in. After that,
  // we will use our own internal ID from mongoDB
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID : keys.googleClientID,
      clientSecret : keys.googleClientSecret,
      callbackURL : '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken,profile, done) => {
      const existingUser = await User.findOne({googleID : profile.id})
      if (existingUser){
        // already had this same person, already a mongoose instance
        // 1st param: error object is null
        // 2nd param: user record
        done(null, existingUser);
      } else {
        // make a new one
        const user = await new User({googleID : profile.id}).save()
        done(null, user);
      }
    }
  )
);
