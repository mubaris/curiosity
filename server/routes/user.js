// logged in/Registered user end point here
const express = require('express');

const router = express.Router();

// POST '/login'
// delete '/logout'
router.get('/', (req, res) => {
    res.send('You reached GET /user end point');
});

router.get('/login', (req, res) => {
    res.send('You are logged in !..lol');
});

router.get('/logout', (req, res) => {
    res.send('You are logged out !..lol');
});

module.exports.userRoutes = router;
