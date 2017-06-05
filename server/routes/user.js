// logged in/Registered user end point here
const express = require('express');
const { passport } = require('./../auth');

const router = express.Router();

// Middleware used to check if authenticated.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('isAuthenticated: failed');
    res.redirect('/user/login');
    return 0;
};

router.get('/', isAuthenticated, (req, res) => {
    res.send(req.user);
});

router.post('/auth', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called
});

router.get('/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      console.log(req.body);
      res.redirect('/');
  });

router.get('/login', (req, res) => {
    res.send('You need to login ! :-(');
});

router.get('/logout', (req, res) => {
    res.send('You are logged out !..lol');
});

module.exports.userRoutes = router;
