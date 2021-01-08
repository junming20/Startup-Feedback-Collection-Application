// This passport refer to the original npm module passport, not services/passport.js
const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google',{
      scope : ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // kills the cookie
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    //res.send(req.session);
    res.send(req.user);
  });
};

// app.get(
//   '/auth/google',
//   passport.authenticate('google',{
//     scope : ['profile', 'email']
//   })
// );

// http://localhost:5000/auth/google/callback?code=4%2F0AY0e-g5OFg9dwaNm-4P0a7-gj_YaTyIxtw1dw7u0co1czrTpTZJVqGJIIgm6-yzRQsfEBQ&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent#
// when user send back, they have the callback?code= code available
// app.get('/auth/google/callback', passport.authenticate('google'));
// test route
// app.get('/', (req, res) => {
//   res.send({bye: 'subsequent update on heroku'});
// })
// have to wait to Heroku to assign a port
// can't be defined with a local machine like your mac
// that's the reason to use 5000 for local
