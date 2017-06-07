// API related to username here.

const express = require('express');

const router = express.Router();

const USERNAMES = [
    'tj',
    'addyosmani',
    'paulirish',
    'passy',
    'sindresorhus',
    'gaearon',
    'defunkt',
    'daimajia',
    'kvz',
    'omgmog',
    'yyx990803',
    'kennethreitz',
    'Trinea',
    'JacksonTian',
    'substack',
    'stormzhang',
    'muan',
    'onevcat',
    'clowwindy',
    'getify',
    'csu',
    'matiasinsaurralde',
    'ibireme',
    'phodal',
    'ryanb',
    'isaacs',
    'justjavac',
    'ChenYilong',
    'cusspvz',
    'feross',
    'm1guelpf',
    'brentvatne',
    'developit',
    'Kureev',
    'mxstbr',
    'jaredly',
];


router.get('/all', (req, res) => {
    res.send(USERNAMES);
});

module.exports.usernameRoutes = router;