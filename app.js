/*jshint esversion: 6 */
const Users = require('./models/users');
// require packages
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// invoke express
const app = express();

// add middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded( { extended : true } ));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  Users.findById(userId, cb);
});

passport.use(new LocalStrategy( (username, password, done) => {
  Users.findUser( { username : username }, (err, user) => {
    if (err) { return(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username'} );
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password'});
    }
    return done(null, user);
  });
}));

// add routes
app.get('/', (req, res) => {
  res.send('smoke test');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login.html'
}));

app.get('/secret', isAuthenticated, (req, res) => {
  res.send(`You have access to the secret: ${req.user.id} ${req.user.username}`);
});

app.get('/admin', hasAdminAccess, (req, res) => {
  res.send(`Welcome to the admin section Head Honcho ${req.user.username}, ${req.user.role}`);
});

app.get('logout', (req, res) => {
  req.logout();
  res.redirect('/login.html');
});

module.exports = app;

// custom authentication check middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login.html');
}

function hasAdminAccess(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return next();
    }
    res.redirect('/secret');
  }
  res.redirect('/login.html');
}